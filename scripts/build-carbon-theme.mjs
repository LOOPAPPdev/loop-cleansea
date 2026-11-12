#!/usr/bin/env node
/**
 * Build the Loop theme for Carbon from data.
 *
 *   tokens.json (Loop values, light + dark)  ─┐
 *   carbon-map.json (Carbon → Loop rules)     ─┴─► carbon-theme.css   (--cds-* custom properties)
 *                                                └─► carbon-report.json (resolved values + WCAG checks)
 *
 * Usage:
 *   node scripts/build-carbon-theme.mjs           write outputs
 *   node scripts/build-carbon-theme.mjs --check   fail if outputs are stale, tokens.css drifts from
 *                                                 tokens.json, a Carbon token is unmapped, or a check fails
 *
 * Exit code 1 on any failure. No network, no dependencies beyond @carbon/themes (for coverage).
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const P = {
  tokensJson: join(ROOT, "src/design-system/tokens/tokens.json"),
  tokensCss: join(ROOT, "src/design-system/tokens/tokens.css"),
  map: join(ROOT, "src/design-system/carbon/carbon-map.json"),
  css: join(ROOT, "src/design-system/carbon/carbon-theme.css"),
  report: join(ROOT, "src/design-system/carbon/carbon-report.json"),
};
const CHECK = process.argv.includes("--check");
const errors = [];
const SCHEMES = ["light", "dark"];

// ---------- 1. Load Loop tokens (flatten DTCG groups) ----------
const tokensJson = JSON.parse(readFileSync(P.tokensJson, "utf8"));
/** @type {Record<string, {light: string, dark: string}>} */
const loop = {};
for (const [group, entries] of Object.entries(tokensJson)) {
  if (group.startsWith("$")) continue;
  for (const [name, t] of Object.entries(entries)) {
    loop[name] = { light: t.$value, dark: t.$extensions?.theme?.dark ?? t.$value };
  }
}

// ---------- 2. Drift check: tokens.css must equal tokens.json ----------
{
  const css = readFileSync(P.tokensCss, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  const darkAt = css.indexOf("@media (prefers-color-scheme: dark)");
  const block = (s) => Object.fromEntries([...s.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim().replace(/var\(--([\w-]+)\)/g, "{$1}")]));
  const light = block(css.slice(css.indexOf(":root"), darkAt));
  const dark = block(css.slice(darkAt));
  for (const [k, v] of Object.entries(light)) {
    if (!loop[k]) errors.push(`drift: --${k} is in tokens.css but not in tokens.json`);
    else if (loop[k].light !== v) errors.push(`drift: --${k} light: css "${v}" ≠ json "${loop[k].light}"`);
  }
  for (const k of Object.keys(loop)) if (!(k in light)) errors.push(`drift: ${k} is in tokens.json but not in tokens.css`);
  for (const [k, v] of Object.entries(dark)) {
    if (loop[k] && loop[k].dark !== v) errors.push(`drift: --${k} dark: css "${v}" ≠ json "${loop[k].dark}"`);
  }
  for (const [k, t] of Object.entries(loop)) {
    if (t.dark !== t.light && !(k in dark)) errors.push(`drift: ${k} has a dark value in json but not in tokens.css`);
  }
}

// ---------- 3. Colour math ----------
/** @returns {[number, number, number, number]} rgba, 0–255 / 0–1 */
function parseColor(s) {
  s = s.trim().toLowerCase();
  if (s === "transparent") return [0, 0, 0, 0];
  let m = s.match(/^#([0-9a-f]{3,8})$/);
  if (m) {
    let h = m[1];
    if (h.length <= 4) h = [...h].map((c) => c + c).join("");
    const n = (i) => parseInt(h.slice(i, i + 2), 16);
    return [n(0), n(2), n(4), h.length === 8 ? n(6) / 255 : 1];
  }
  m = s.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:\s*[/,]\s*([\d.]+%?))?\s*\)$/);
  if (m) {
    const a = m[4] === undefined ? 1 : m[4].endsWith("%") ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
    return [+m[1], +m[2], +m[3], a];
  }
  throw new Error(`cannot parse colour "${s}"`);
}
/** CSS color-mix(in srgb, a p, b) with premultiplied alpha. */
function mix(a, b, p) {
  const alpha = a[3] * p + b[3] * (1 - p);
  if (alpha === 0) return [0, 0, 0, 0];
  const ch = (i) => (a[i] * a[3] * p + b[i] * b[3] * (1 - p)) / alpha;
  return [ch(0), ch(1), ch(2), alpha];
}
const over = (fg, bg) => mix([fg[0], fg[1], fg[2], 1], bg, fg[3]).map((v, i) => (i === 3 ? 1 : v)); // composite
const hex = (c) => "#" + c.slice(0, 3).map((v) => Math.round(v).toString(16).padStart(2, "0")).join("") + (c[3] < 1 ? Math.round(c[3] * 255).toString(16).padStart(2, "0") : "");
const lum = (c) => {
  const f = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]);
};
const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

// ---------- 4. Resolve Loop tokens to colours per scheme ----------
function resolveLoop(name, scheme, seen = new Set()) {
  if (!loop[name]) throw new Error(`unknown Loop token {${name}}`);
  if (seen.has(name)) throw new Error(`cycle at {${name}}`);
  seen.add(name);
  return evalLoopValue(loop[name][scheme], scheme, seen);
}
function evalLoopValue(v, scheme, seen = new Set()) {
  v = v.trim();
  const alias = v.match(/^\{([\w-]+)\}$/);
  if (alias) return resolveLoop(alias[1], scheme, new Set(seen));
  const cm = v.match(/^color-mix\(in srgb,\s*(.+?)\s+([\d.]+)%,\s*(.+)\)$/);
  if (cm) return mix(evalLoopValue(cm[1], scheme, seen), evalLoopValue(cm[3], scheme, seen), +cm[2] / 100);
  return parseColor(v);
}

// ---------- 5. Compile map expressions → CSS + resolved colour ----------
const isColorToken = (name) => /^(loop-|color-|action-)/.test(name);
function compile(expr, scheme) {
  expr = expr.trim();
  let m = expr.match(/^\{([\w-]+)\}$/);
  if (m) {
    if (!loop[m[1]]) throw new Error(`unknown Loop token {${m[1]}}`);
    return { css: `var(--${m[1]})`, color: isColorToken(m[1]) ? resolveLoop(m[1], scheme) : null, literal: false };
  }
  m = expr.match(/^mix\((.+),\s*(.+),\s*([\d.]+)\)$/);
  if (m) {
    const a = compile(m[1], scheme), b = compile(m[2], scheme), p = +m[3];
    return { css: `color-mix(in srgb, ${a.css} ${p}%, ${b.css})`, color: mix(a.color, b.color, p / 100), literal: a.literal || b.literal };
  }
  m = expr.match(/^invert\(\{([\w-]+)\}\)$/);
  if (m) {
    const c = resolveLoop(m[1], scheme === "light" ? "dark" : "light");
    return { css: hex(c), color: c, literal: true };
  }
  if (expr === "transparent") return { css: "transparent", color: [0, 0, 0, 0], literal: false };
  let color = null;
  try { color = parseColor(expr); } catch { /* non-colour literal */ }
  return { css: expr, color, literal: true };
}

const map = JSON.parse(readFileSync(P.map, "utf8"));
const rules = { ...map.theme, ...map.component };
/** @type {Record<string, Record<string, {css: string, color: any, literal: boolean, expr: string}>>} */
const out = {};
for (const [name, rule] of Object.entries(rules)) {
  out[name] = {};
  for (const s of SCHEMES) {
    const expr = typeof rule === "string" ? rule : rule[s];
    try {
      out[name][s] = { ...compile(expr, s), expr };
    } catch (e) {
      errors.push(`map: ${name} (${s}): ${e.message}`);
    }
  }
}

// ---------- 6. Coverage: every Carbon theme token must be mapped ----------
{
  const require = createRequire(import.meta.url);
  const { white } = require("@carbon/themes");
  const kebab = (k) => k.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/([a-zA-Z])(\d)/g, "$1-$2").toLowerCase();
  const carbonKeys = Object.keys(white)
    .filter((k) => typeof white[k] === "string" && !map.exclude.some((p) => k.startsWith(p)))
    .map(kebab);
  for (const k of carbonKeys) if (!map.theme[k]) errors.push(`coverage: Carbon theme token "${k}" has no Loop rule (falls back to IBM default)`);
  for (const k of Object.keys(map.theme)) if (!carbonKeys.includes(k)) errors.push(`coverage: "${k}" is not a Carbon theme token (typo?)`);

  // Component tokens (e.g. buttonTokens, notificationTokens) for every component group we load.
  const themes = require("@carbon/themes");
  const compKeys = map.componentGroups.flatMap((g) => {
    const group = themes[`${g}Tokens`];
    if (!group) { errors.push(`coverage: Carbon has no "${g}Tokens" group`); return []; }
    return Object.keys(group).map(kebab);
  });
  for (const k of compKeys) if (!map.component[k]) errors.push(`coverage: Carbon component token "${k}" has no Loop rule (falls back to IBM default)`);
  for (const k of Object.keys(map.component)) {
    if (!compKeys.includes(k) && !k.endsWith("-radius")) errors.push(`coverage: "${k}" is not a Carbon component token (typo?)`);
  }
}

// ---------- 7. Contrast checks ----------
const bgBase = (s) => resolveLoop("color-bg", s);
const checks = map.checks.map(([fg, bg, min, label]) => {
  const r = { fg, bg, min, label };
  for (const s of SCHEMES) {
    const B = out[bg]?.[s]?.color, F = out[fg]?.[s]?.color;
    if (!B || !F) { errors.push(`check: ${fg} on ${bg} — token missing`); continue; }
    const bgSolid = over(B, bgBase(s));
    const v = ratio(over(F, bgSolid), bgSolid);
    r[s] = { ratio: Math.round(v * 100) / 100, pass: v >= min, fg: hex(over(F, bgSolid)), bg: hex(bgSolid) };
    if (v < min) errors.push(`WCAG: ${label} — ${fg} on ${bg} (${s}) = ${v.toFixed(2)}:1, needs ${min}:1`);
  }
  return r;
});

// ---------- 8. Emit ----------
const header = "/* GENERATED by scripts/build-carbon-theme.mjs from tokens.json + carbon-map.json. Do not edit. Run `npm run tokens:carbon`. */\n";
const decl = (name, v) => `  --cds-${name}: ${v.css};`;
const lightDecls = Object.entries(out).filter(([, v]) => v.light).map(([n, v]) => decl(n, v.light));
const darkDecls = Object.entries(out)
  .filter(([, v]) => v.dark && (v.dark.literal || v.dark.css !== v.light?.css))
  .map(([n, v]) => "  " + decl(n, v.dark));
const cssOut =
  header +
  `:root {\n${lightDecls.join("\n")}\n}\n\n` +
  `/* Only rules that differ in dark. Everything else follows tokens.css via var(). */\n` +
  `@media (prefers-color-scheme: dark) {\n  :root {\n${darkDecls.join("\n")}\n  }\n}\n`;

const reportOut = JSON.stringify(
  {
    $description: "GENERATED. Resolved Loop→Carbon theme and WCAG 2.1 AA checks. Read by the /carbon-gate/theme preview.",
    tokens: Object.entries(out).map(([name, v]) => ({
      name,
      kind: name in map.component ? "component" : "theme",
      rule: { light: v.light?.expr, dark: v.dark?.expr },
      value: { light: v.light?.color ? hex(v.light.color) : v.light?.css, dark: v.dark?.color ? hex(v.dark.color) : v.dark?.css },
    })),
    checks,
    summary: {
      tokens: Object.keys(out).length,
      checks: checks.length * SCHEMES.length,
      failed: checks.reduce((n, c) => n + SCHEMES.filter((s) => c[s] && !c[s].pass).length, 0),
    },
  },
  null,
  2,
) + "\n";

if (CHECK) {
  if (!existsSync(P.css) || readFileSync(P.css, "utf8") !== cssOut) errors.push("stale: carbon-theme.css — run `npm run tokens:carbon`");
  if (!existsSync(P.report) || readFileSync(P.report, "utf8") !== reportOut) errors.push("stale: carbon-report.json — run `npm run tokens:carbon`");
} else {
  writeFileSync(P.css, cssOut);
  writeFileSync(P.report, reportOut);
}

const s = JSON.parse(reportOut).summary;
console.log(`Loop → Carbon: ${s.tokens} tokens · ${s.checks} contrast checks · ${s.failed} failed`);
if (errors.length) {
  console.error(`\n✗ ${errors.length} problem(s):\n- ` + errors.join("\n- "));
  process.exit(1);
}
console.log(CHECK ? "✓ tokens.json ↔ tokens.css in sync, theme up to date, all Carbon tokens mapped, AA passes" : `✓ wrote ${P.css.replace(ROOT + "/", "")} and ${P.report.replace(ROOT + "/", "")}`);
