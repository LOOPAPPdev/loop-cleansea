# Component quality — Loop

React lets you build excellent or poor interfaces. Quality comes from how a component is **architected, styled, organised and adapted to real use**, not from React itself.

## 1. Seven criteria

| Criterion | Good | Poor |
|---|---|---|
| Responsiveness | Adapts to every screen | Breaks on small screens |
| Reuse | Works in different contexts | Depends on specific values |
| Composition | One clear responsibility | Accumulates several jobs |
| Design | Uses tokens and patterns | Improvised CSS |
| Accessibility | Keyboard and screen reader support | Ignores accessibility |
| Behaviour | Predictable states and interactions | Inconsistent interactions |
| Maintenance | Organised, testable code | A change causes side effects |

## 2. Example: the site header

**Poor** — all links forced onto one line. It renders, but it does not define how navigation behaves on a phone, so labels wrap and the bar grows.

```tsx
function Header() {
  return (
    <header>
      <nav>
        <a href="/">Soluções</a>
        <a href="/">Por que a Loop</a>
        <a href="/">Planos</a>
        <a href="/">Parceiros</a>
      </nav>
    </header>
  );
}
```

**Production** — `src/design-system/composites/Header.tsx`:

| Requirement | Implementation |
|---|---|
| WHEN the viewport is < 1100px, THEN the nav MUST collapse behind a "Menu" button | Mobile-first CSS; `.nav` is a full-width panel shown by `data-open` |
| The Menu button MUST expose its state | `aria-expanded`, `aria-controls="site-nav"`; label changes to "Fechar" |
| WHEN a group is activated, THEN its links MUST expand in place (mobile) or in a dropdown (desktop) | One disclosure button per group with `aria-expanded` |
| WHEN the user presses Esc, THEN the open group or panel MUST close AND focus MUST return to its button | Document `keydown` listener |
| WHEN the user clicks outside, THEN everything MUST close | Document `click` listener |
| WHEN the route changes, THEN the panel MUST close | State adjusted during render when `usePathname()` changes |
| WHILE the mobile panel is open, the page behind MUST NOT scroll | `body.style.overflow = "hidden"` |
| Labels MUST NOT wrap | `white-space: nowrap`; compact styles ≤ 359px so the bar fits 320px |
| Section anchors MUST NOT be marked as the current page | `aria-current` only for exact paths without `#` |
| Links come from data | `nav` from `src/content/site-map.json` |

## 3. Layers

```
Layer 1  Tokens        colours, type, spacing, radius, motion, breakpoints
Layer 2  Primitives    Button, Badge, Card, Container, Field, IconTile
Layer 3  Composites    Header, Footer, Hero, CardGrid, FeatureMedia, Faq …
Layer 4  Templates     Home, Team, Industry, Pricing, About, Contact …
         Routes        src/app/**/page.tsx (thin)
```

Change a spacing token and every component that uses it follows, without editing screens one by one.

## 4. Acceptance (Gherkin) — automated in `scripts/ui-check.mjs`

```gherkin
Scenario: No horizontal overflow
  GIVEN any of the 21 routes
  WHEN it loads at 320, 390, 820 or 1440 px
  THEN the page MUST NOT scroll sideways
  AND there MUST be exactly one <h1>
  AND no header label MUST wrap onto two lines

Scenario: Mobile menu
  GIVEN a viewport narrower than 1100px
  WHEN the visitor activates "Menu"
  THEN the navigation panel opens AND the button reports aria-expanded="true"
  WHEN the visitor presses Esc twice
  THEN the panel closes AND focus returns to the Menu button
  WHEN the visitor follows a link in the panel
  THEN the new page loads AND the panel is closed

Scenario: Desktop dropdown
  GIVEN a viewport of 1100px or wider
  WHEN the visitor opens "Empresa" and presses Esc
  THEN the dropdown closes AND focus returns to "Empresa"

Scenario: Contact form errors
  GIVEN the contact form is empty
  WHEN the visitor submits
  THEN "Preencha seu nome." is shown as text
  AND focus moves to the first invalid field
```

## 5. Production-ready checklist
- [ ] Responsive on phone, tablet and desktop.
- [ ] No horizontal overflow or overlapping elements.
- [ ] Uses design tokens only.
- [ ] Interaction states: hover, focus, active, disabled, loading (when applicable).
- [ ] Basic accessibility validated (keyboard, names, roles, states, contrast).
- [ ] Reusable, one responsibility.
- [ ] Behaviour tests pass (`npm run test:ui`).
- [ ] Visually consistent with the other components.

**Core point:** a quality component is not the one that looks right on the developer's screen. It keeps working, visually and functionally, across screens, content, states and contexts.
