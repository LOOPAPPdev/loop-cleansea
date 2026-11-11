/**
 * UI acceptance check (Gherkin scenarios in docs/component-quality.md).
 * Usage: npm run build && npm start   # in one terminal
 *        BASE_URL=http://localhost:3000 node scripts/ui-check.mjs
 * Needs the `playwright` package with a Chromium browser.
 */
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const ROUTES = [
  "/solucoes", "/solucoes/areas/estrategia", "/solucoes/areas/dados/workflows", "/solucoes/setores/saude",
  "/solucoes/casos/agentes", "/por-que-loop/empresas", "/planos", "/parceiros", "/parceiros/p1", "/aprender",
  "/guias/g1", "/sobre", "/principios", "/carreiras", "/carreiras/busca", "/carreiras/vaga-1", "/seguranca",
  "/residencia", "/noticias", "/contato", "/privacidade",
];
const VIEWPORTS = { mobile: [320, 740], phone: [390, 844], tablet: [820, 1180], desktop: [1440, 900] };
const fails = [];
const check = (ok, msg) => { if (!ok) fails.push(msg); };

const browser = await chromium.launch();
for (const [name, [w, h]] of Object.entries(VIEWPORTS)) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const r of ROUTES) {
    const res = await page.goto(BASE + r);
    check(res?.ok(), `${name} ${r}: HTTP ${res?.status()}`);
    const m = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      h1: document.querySelectorAll("h1").length,
      // Header items must stay on one line (no wrapped labels).
      wrapped: [...document.querySelectorAll("header a, header button")].filter((el) => {
        const lh = parseFloat(getComputedStyle(el).lineHeight) || 20;
        return el.offsetParent !== null && el.getBoundingClientRect().height > Math.max(lh * 1.9, 60);
      }).map((el) => el.textContent.trim()),
      smallTargets: [...document.querySelectorAll("main a, main button, header a, header button")].filter((el) => {
        const b = el.getBoundingClientRect();
        return el.offsetParent !== null && b.width > 0 && b.height < 32;
      }).length,
    }));
    check(!m.overflow, `${name} ${r}: horizontal overflow`);
    check(m.h1 === 1, `${name} ${r}: expected 1 <h1>, found ${m.h1}`);
    check(m.wrapped.length === 0, `${name} ${r}: header labels wrap: ${m.wrapped.join(", ")}`);
    check(m.smallTargets === 0, `${name} ${r}: ${m.smallTargets} targets under 32px`);
  }

  // Header behaviour.
  await page.goto(BASE + "/solucoes");
  if (w < 1100) {
    const menu = page.locator("button[aria-controls=\"site-nav\"]");
    check(await menu.isVisible(), `${name}: Menu button hidden`);
    await menu.click();
    check((await menu.getAttribute("aria-expanded")) === "true", `${name}: Menu does not expand`);
    check(await page.locator("#site-nav").isVisible(), `${name}: nav panel not visible after open`);
    await page.getByRole("button", { name: "Empresa" }).click();
    check(await page.getByRole("link", { name: "Sobre", exact: true }).first().isVisible(), `${name}: group does not expand`);
    await page.keyboard.press("Escape"); // closes group
    await page.keyboard.press("Escape"); // closes panel
    check(!(await page.locator("#site-nav").isVisible()), `${name}: Esc does not close panel`);
    check(await page.evaluate(() => document.activeElement?.getAttribute("aria-controls") === "site-nav"), `${name}: focus not returned to Menu`);
    await menu.click();
    await page.getByRole("button", { name: "Empresa" }).click();
    await page.getByRole("link", { name: "Sobre", exact: true }).first().click();
    await page.waitForURL("**/sobre");
    check(!(await page.locator("#site-nav").isVisible()), `${name}: panel stays open after navigation`);
  } else {
    const grp = page.getByRole("button", { name: "Empresa" });
    await grp.click();
    check(await page.locator("#nav-panel-5").isVisible(), `${name}: dropdown does not open`);
    await page.keyboard.press("Escape");
    check(!(await page.locator("#nav-panel-5").isVisible()), `${name}: Esc does not close dropdown`);
    check(await page.evaluate(() => document.activeElement?.textContent?.includes("Empresa")), `${name}: focus not returned to group button`);
  }

  // Contact form: errors are text and focus moves to the first invalid field.
  await page.goto(BASE + "/contato");
  await page.getByRole("button", { name: "Enviar mensagem" }).click();
  check(await page.getByText("Preencha seu nome.").isVisible(), `${name}: form error not shown`);
  check(await page.evaluate(() => document.activeElement?.getAttribute("name") === "nome"), `${name}: focus not on first invalid field`);

  check(errors.length === 0, `${name}: JS errors: ${errors.join(" | ")}`);
  await page.close();
}
await browser.close();

if (fails.length) {
  console.error(`✗ ${fails.length} failures\n- ` + fails.join("\n- "));
  process.exit(1);
}
console.log(`✓ ${ROUTES.length} routes × ${Object.keys(VIEWPORTS).length} viewports, header and form behaviour passed`);
