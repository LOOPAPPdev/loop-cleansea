# Loop Consultoria — Cleansea (site + design system)

> CORE PRINCIPLE: Minimal instructions. Maximum contextual understanding. Controlled autonomy. Visual clarity. Verified execution.

# Part I — Operating rules (Controlled Language · Agentic Engineering · Visual Communication)

Keywords MUST, SHOULD and MAY follow RFC 2119.

## 1. Mission
- The agent MUST turn natural-language requests into functional, verified, reusable deliverables.
- The agent MUST reduce human effort without lowering quality, safety or accuracy.
- The agent SHOULD prefer simple, modular, autonomous and reproducible solutions.
- The agent MUST infer intent from the repository, this file and the conversation. It SHOULD NOT ask a question that the context answers.

## 2. Controlled language (ASD-STE100)
- Write short sentences: one sentence, one action.
- Use active voice and explicit verbs ("Run", "Add", "Remove").
- Use one term for one concept. Use the glossary terms of the design system: token, component, pattern, preview, ground, tint.
- Do not use jargon when a plain word exists.
- Label each statement: **Fact** (verified), **Assumption** (not verified), **Hypothesis** (to test), **Recommendation** (proposed action).

## 3. Requirements (EARS + RFC 2119)
- The agent MUST convert each request into testable requirements before it builds.
- Each requirement MUST state input, output, constraints and acceptance criteria.
- Use the EARS patterns:
  - Ubiquitous: "The <component> MUST <behaviour>."
  - Event: "WHEN <trigger>, THEN the <component> MUST <response>."
  - State: "WHILE <state>, the <component> MUST <behaviour>."
  - Unwanted: "IF <fault>, THEN the <component> MUST <recovery>."
- The agent MAY ask for clarification ONLY IF the uncertainty changes the result materially. Otherwise it MUST choose a sensible default and record it as an **Assumption**.

Example:
> WHEN the user selects a card, THEN the card MUST show `--loop-blue-tint` and a `--loop-blue` border, AND MUST set `aria-pressed="true"`.

## 4. Architecture (MACRO / MESO / MICRO)
| Level | Question | Output |
|---|---|---|
| MACRO | What is the goal, scope and expected result? | Objective + acceptance criteria |
| MESO | Which workflow, Skills, agents and tools? | Plan with ordered steps |
| MICRO | How to implement, validate and deliver? | Code, preview, test evidence |

- Keep data, business logic, interface and infrastructure in separate layers.
- MUST reuse existing schemas, components and tokens before creating new ones.

## 5. Agent orchestration
- Delegate independent work to specialised subagents (for example: `design:design-system`, `design:accessibility-review`, `design:design-handoff`).
- Run cheap deterministic checks first (lint, contrast script, `node --check`, grep for hard-coded hex). Use model reasoning after that.
- Choose the model by complexity, cost and risk.
- Integrate subagent outputs and validate them independently. The agent that produces MUST NOT be the only agent that approves.
- Record decisions and reusable knowledge (this file, Skills, tests).

## 6. Execution (aviation protocol)
Follow this checklist for each task:
1. **Pre-flight:** Verify prerequisites (files exist, tokens loaded, tools connected).
2. **Authorisation:** Ask before destructive or sensitive actions (delete, overwrite, push, publish to others, spend).
3. **Execute** in small steps with a checkpoint after each step.
4. **Monitor:** Detect failures. Recover context. Correct. Retest.
5. **Report:** State what ran and what did not.
- The agent MUST NEVER report success that it did not verify.

## 7. Verification (Gherkin + FMEA)
- Write acceptance tests as GIVEN–WHEN–THEN:
  ```gherkin
  Scenario: Keyboard user selects an agent card
    GIVEN the agents grid is visible
    WHEN the user presses Tab until a card has focus and presses Enter
    THEN the card shows the blue selected state
    AND the screen reader announces "pressed"
  ```
- Validate function, security, accessibility (WCAG 2.1 AA) and usability.
- For each new component, list failure modes in an FMEA table: failure · effect · cause · severity (1–5) · detection · action. Fix the highest risk first.
- Prefer real use (keyboard, screen reader, 320px, 200% zoom) over benchmark scores.
- Convert each recurring failure into a regression test or a rule in this file.

## Appendix A — Visual-first explanations (highest-priority rule)
- WHEN a concept is complex (architecture, dependencies, flows, cause and effect, states), THEN the agent MUST evaluate whether a diagram, simulation or interactive HTML page communicates better than text.
- IF a visual communicates better, THEN the agent SHOULD produce it: SVG diagram, flowchart, HTML preview or interactive demo (Design canvas or Design System storyboard).
- This rule does NOT require visuals in every answer. Use a visual only when it improves understanding.
- Use progressive disclosure: overview first, details on demand.
- Prefer a working visualisation over a long theoretical explanation.
- Visuals MUST use the design tokens in this file and MUST meet WCAG 2.1 AA.
- A visual MUST NOT replace necessary technical accuracy.

## Appendix B — Short prompts, deep context
- Interpret short requests through project files and these conventions.
- Read the relevant instructions; do not ask the user to repeat them.
- Do not add contradictory or excessive requirements.

## Appendix C — Data-first development
- Structured data and schemas (`tokens.json`, component props, content JSON) are the source of truth.
- Keep core data independent of the interface, so several implementations can use the same validated data.

## Appendix D — Continuous improvement
- Fix recurring problems at the source (token, component, rule), not in each screen.
- Document reusable solutions as Skills, rules or tests.
- Keep work reproducible across projects.

## Appendix E — Delivery protocol
- Deliver functional artifacts and a visual preview when useful.
- Explain WHAT changed, WHY, and HOW it was verified.
- Separate the executive summary from the technical detail.
- Report limitations, risks and outstanding work.

---

# Part II — This repository

## Stack
Next.js 16 (App Router) on Cloudflare Workers via OpenNext. TypeScript strict. CSS Modules + design tokens (no Tailwind classes in components).

Commands: `npm run dev` · `npm run build` · `npm run lint` · `npm run typecheck` · `npm run test:ui` (needs `npm start` running) · `npm run preview` (Workers runtime locally) · `npm run deploy` (ONLY with explicit approval).

## Architecture: 4 layers (a lower layer never imports a higher one)
| Layer | Path | Contains | May import |
|---|---|---|---|
| 1 Tokens | `src/design-system/tokens/` | `tokens.css` (colours, type, spacing, radius, motion), `base.css`, `tokens.ts` (breakpoints, tones), `tokens.json` | — |
| 2 Primitives | `src/design-system/primitives/` | Button, ButtonLink, Badge, Card, Container, Section, Field, IconTile | tokens |
| 3 Composites | `src/design-system/composites/` | Header, Footer, Hero, CardGrid, IllustratedCard, MediaCardRow, FeatureCards, LinkCards, SectionIntro, FeatureMedia, CtaBand, Quote, StatTiles, Faq, Breadcrumb, Steps, PlanCards, ComparisonTable, OrgGrid, Prose | primitives, tokens, `@/content` types |
| 4 Templates | `src/templates/` | Home, Team, Workflows, Industry, UseCase, Segment, Pricing, Directory, Profile, Hub, Article, About, Careers, JobSearch, JobPost, Program, Listing, Contact | composites, primitives, content |
| Routes | `src/app/` | thin `page.tsx` files: read params → pick content → render a template | templates, content |
| Content | `src/content/site-map.json` + `index.ts` | navigation, routes, home copy, copy limits (source of truth) | — |

Rules:
- Pages MUST NOT contain layout CSS or copy. They pass content to a template.
- Components MUST NOT hard-code copy, links or colours. Copy and links come from `src/content`; colours from tokens.
- A new visual value goes into `tokens.css` first (light and dark), then is used by name.
- Change navigation or home sections in `site-map.json`, not in components.

## Definition of done for a component (all MUST pass)
1. Responsive at 320, 390, 820 and 1440 px. No horizontal overflow, no overlap, labels do not wrap in the header.
2. Uses tokens only (grep for `#` hex in `.module.css`: only the IllustratedCard label (white chip + its ink colours) is allowed).
3. States: hover, focus-visible, active, disabled, loading (where it triggers an action), error (where it takes input).
4. Accessibility: native elements, visible focus, targets ≥ 44px, `aria-expanded` / `aria-pressed` / `aria-current` / `aria-invalid` where relevant, Esc closes overlays and returns focus.
5. Single responsibility; props typed; no side effects outside the component.
6. `npm run lint`, `npm run typecheck`, `npm run build` and `npm run test:ui` pass.
7. Visually consistent with the other components (same radii, spacing, type scale).

Details and examples: `docs/component-quality.md`. Site map and copy limits: `docs/site-architecture.md`.
