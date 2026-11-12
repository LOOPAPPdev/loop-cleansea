# Carbon foundation — Gate 0 (compatibility)

Date: 2026-11-12 · Branch: `claude/great-gates-5yjlbu` · Verdict: **GO, with 3 hard rules**

## Question
Can `@carbon/react` v11 run in this stack (Next 16 + React 19.2 + OpenNext on Cloudflare Workers) at an acceptable cost?

## Setup
- `@carbon/react@1.120.0`, `@carbon/icons-react@11.92.0`, `sass@1.108.2` (exact pins).
- Probe routes (temporary, `noindex`): `/carbon-gate` (barrel imports, server + client) and `/carbon-gate/deep` (deep imports, client only).
- Components: Grid, Column, Tile, Button, TextInput, DataTable, Modal, InlineNotification, one icon.

## Results
| Check | Result |
|---|---|
| Peer deps (React 19) | PASS: Carbon declares `react ^19.0.0` |
| `typecheck`, `lint`, `next build` | PASS |
| OpenNext build + `wrangler dev` (Workers runtime) | PASS |
| Browser: 2 routes × 320/390/820/1440 (status, overflow, styles, console) | 32/32 PASS |
| Modal: Enter opens, Esc closes, focus returns | PASS (needs `launcherButtonRef`) |
| TextInput `aria-invalid`; Button `lg` target | PASS; 48px |
| Leak: `/contato` loads no Carbon CSS | PASS |
| Sass warnings | 6 deprecation warnings inside Carbon (`if()` syntax). Not ours; harmless. |

## Cost (measured)
| Metric | Baseline | Barrel import | Deep import |
|---|---|---|---|
| Route JS (gzip) | 175 KB (`/contato`) | 408 KB (+233) | 249 KB (**+74**) |
| Route CSS (gzip) | 6 KB | 32 KB (+26) | 32 KB (+26) |
| Worker bundle (gzip; free-plan limit 3072 KiB) | 2323 KiB | 2727 KiB (+404) | 2403 KiB (**+79**) |

`experimental.optimizePackageImports` gave no reduction (reverted).

## Hard rules (adopt on GO)
1. **Never import from the `@carbon/react` barrel.** Its `index.js` is `"use client"` and marked `sideEffects`, so the whole library ships to both client and Worker. Use deep paths (`@carbon/react/es/components/...`) inside Loop wrappers only.
2. **With per-component SCSS, always `@use '@carbon/react/scss/layout'`.** It emits the `:root` layout tokens. Without it, buttons collapse to 20px.
3. **Modal must receive `launcherButtonRef`**, or focus does not return to the trigger after Esc.

Also: Carbon components are client components. Deep-imported modules do not carry `"use client"`, so wrappers MUST declare it.

## Found, not caused by Carbon (separate fixes)
- **FIXED — SSG pages returned 404 on the Workers runtime** (e.g. `/solucoes/casos/agentes`, `/privacidade`). Cause (confirmed with a clean control build): `open-next.config.ts` had no incremental cache, so `preview`/`deploy` did not upload prerendered pages. Fix: `staticAssetsIncrementalCache` (read-only; valid while no route uses `revalidate`). Note: test the Workers runtime with `npm run preview`, not raw `wrangler dev`, which skips cache population.
- `npm run test:ui` fails: `playwright` is not a dependency of the repo.
- Footer links prefetch pages that do not exist yet (`/termos`, `/cookies`, `/por-que-loop/empresas`).

## Identity gap (input for the theme step)
Stock Carbon renders IBM blue `#0f62fe`, 0px radius, grey fields. Font inheritance works: the probe already uses Inter, not IBM Plex (`$css--font-face: false`).

## Next
Gate 1: generate a `loop` Carbon theme (light + dark) from `tokens.json` and a token preview page with contrast checks.
