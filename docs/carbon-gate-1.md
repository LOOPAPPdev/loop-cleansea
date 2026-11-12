# Carbon foundation — Gate 1 (Loop theme)

Date: 2026-11-12 · Branch: `claude/great-gates-5yjlbu` · Verdict: **PASS** (brand gate open, 2 decisions below)

## What was built
| File | Role | Edited by |
|---|---|---|
| `src/design-system/tokens/tokens.json` | Loop tokens (DTCG, light + dark). Source of truth. | People |
| `src/design-system/carbon/carbon-map.json` | Rules: Carbon token → Loop token. Brand decisions only. | People |
| `scripts/build-carbon-theme.mjs` | Generator + checks. `npm run tokens:carbon` / `tokens:check` | — |
| `src/design-system/carbon/carbon-theme.css` | `--cds-*` = `var(--loop…)`. GENERATED. | Script |
| `src/design-system/carbon/carbon-report.json` | Resolved values + WCAG results. GENERATED. | Script |
| `src/design-system/carbon/carbon.scss` | The only file that loads Carbon CSS. Loop shape layer. | People |
| `/carbon-gate/theme` | Preview: live components, contrast table, token table. noindex. | — |

**Correction made:** the previous `tokens.json` was not Loop's: it held another brand's palette (`#0071e3`, `eco-*`, `brain-*`) and nothing read it. It was regenerated from `tokens.css`, which is what the site renders. `tokens:check` now fails if the two drift.

## How the theme works
Carbon reads every colour at runtime as `var(--cds-x, fallback)`. The generated file sets each `--cds-x` to a Loop variable, for example `--cds-background: var(--color-bg)`. Dark mode needs no copy: `tokens.css` switches the Loop variables and Carbon follows. Only 19 rules differ per scheme (layers 02/03, inverse colours).

## Verification (Workers runtime, `opennextjs-cloudflare preview`)
| Check | Result |
|---|---|
| Coverage: all 104 Carbon theme tokens + 26 button/notification component tokens mapped | PASS |
| WCAG AA contrast: 44 pairs × light/dark = 88 checks | 88/88 PASS (lowest: field border 3.15:1, min 3) |
| Independent ratio check (Python) | matches |
| Mutation tests: low contrast, unmapped token, unmapped component token, css/json drift | all 4 detected |
| Browser: light + dark × 320/390/820/1440: status, errors, overflow | PASS |
| Brand: primary = `--action-primary`, pill buttons, 8px fields with full border, 16px tiles/modal, Inter | PASS |
| Leak scan: no IBM palette colour in any computed style | PASS |
| axe-core WCAG 2.1 AA, light + dark | 0 violations |
| Keyboard: modal Enter/Esc, focus return; focus ring Loop blue | PASS |
| `/contato` loads no Carbon CSS; site UI suite 21 routes × 4 viewports | PASS |

## Failures found and fixed during the gate
1. **IBM tints leaked into notifications** (`#edf5ff`). Cause: notification component tokens were not mapped. Fix: map them, and extend coverage to component token groups (`componentGroups`), so this cannot recur silently.
2. **Carbon `TextInput` error is not announced reliably.** Carbon sets only `aria-errormessage`. Wrapper rule: also set `aria-describedby` to the error id.
3. **`.sr-only` inside a scroll container widened the page at 320px.** Fix: scroll containers get `position: relative`.
4. **ESLint ran out of memory** after Workers builds: `.wrangler/` was not ignored. Fixed in `eslint.config.mjs`.

## Brand gate — decisions for the owner
| Topic | Carbon now | Loop today | Options |
|---|---|---|---|
| Button label | 14px, left-aligned (Carbon pattern) | 17px, centred | A: keep Carbon (product feel). B: Loop shape layer centres + 17px for `lg`. |
| Field label | 12px | 14–17px | A: keep Carbon. B: map to `--text-caption` (14px). |

## Limits
- Corner radius: only Button has a Carbon token. Fields, tile, modal and notifications use 6 rules in `carbon.scss` that target Carbon classes. Re-check them on every Carbon upgrade.
- DataTable corners are left square (rounding needs `overflow: hidden`, which can clip menus).
- Carbon type scale (productive, 14px base) is not yet mapped to Loop type tokens.

## Next
Gate 2: wrappers in `src/design-system/carbon/` (typed Loop props, deep imports, a11y rules above), then the pilot page (Contact) for the brand gate.
