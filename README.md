# Cleansea — Loop Consultoria

Website and design system for **Loop Consultoria**, built with Next.js 16 (App Router) and deployed to Cloudflare Workers through [OpenNext](https://opennext.js.org/cloudflare). Started from `cloudflare/templates/next-starter-template`.

> Prototype: copy is lorem ipsum. Values marked `[A DEFINIR]` still need real data.

## Quick start

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000 (redirects to `/solucoes`).

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build (Next.js) |
| `npm run lint` | ESLint (Next core-web-vitals + TypeScript) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test:ui` | Playwright acceptance check: 21 routes × 4 viewports, header and form behaviour. Run `npm run build && npm start` first; set `BASE_URL` if not on port 3000. Needs `playwright` with Chromium (`npx playwright install chromium`). |
| `npm run preview` | Build with OpenNext and run in the local Workers runtime |
| `npm run deploy` | Build and deploy to Cloudflare (worker `loop-cleansea`) |

## Structure

```
src/
  design-system/
    tokens/       Layer 1 — tokens.css, base.css, tokens.ts, tokens.json
    primitives/   Layer 2 — Button, Badge, Card, Container, Field, IconTile
    composites/   Layer 3 — Header, Footer, Hero, CardGrid, FeatureMedia, Faq …
  templates/      Layer 4 — Home, Team, Industry, Pricing, About, Contact …
  content/        site-map.json (source of truth) + typed accessors
  app/            routes (thin page.tsx files)
docs/
  site-architecture.md   sitemap, templates, copy and layout limits
  component-quality.md   quality criteria, header example, acceptance tests
scripts/ui-check.mjs     acceptance check
CLAUDE.md                operating rules + repository rules for agents
```

## Routes

`/solucoes` (home) · `/solucoes/areas/[slug]` (+ `/workflows`) · `/solucoes/setores/[slug]` · `/solucoes/casos/[slug]` · `/por-que-loop/[segmento]` · `/planos` · `/parceiros` (+ `/[slug]`) · `/aprender` · `/guias/[slug]` · `/sobre` · `/principios` · `/carreiras` · `/carreiras/busca` · `/carreiras/[slug]` · `/seguranca` · `/residencia` · `/noticias` (+ `/[slug]`) · `/contato` · `/privacidade` · `/termos` · `/cookies` · `/integracoes`.

Navigation and home sections are driven by `src/content/site-map.json`.

## Design tokens

Palette: white · blue-gray · green · purple · blue, with light and dark themes (`prefers-color-scheme`). See `src/design-system/tokens/tokens.css`.
