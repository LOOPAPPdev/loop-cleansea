import Link from "next/link";
import { Badge, ButtonLink, Container, Section } from "../primitives";
import s from "./composites.module.css";

export function StatTiles({ items }: { items: { value: string; label: string }[] }) {
  return (
    <Section>
      <Container>
        <dl className={s.stats}>
          {items.map((it) => (
            <div key={it.label} className={s.stat}>
              <dt className={s.statLabel}>{it.label}</dt>
              <dd className={s.statValue}>{it.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}

/** FAQ with native <details>: keyboard and screen-reader support built in. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Section>
      <Container narrow>
        <h2 className={s.h2}>Perguntas frequentes</h2>
        {items.map((it) => (
          <details key={it.q} className={s.faq}>
            <summary className={s.faqQ}>{it.q}</summary>
            <p className={s.faqA}>{it.a}</p>
          </details>
        ))}
      </Container>
    </Section>
  );
}

export function Breadcrumb({ items }: { items: { label: string; href: string }[] }) {
  return (
    <Container as="nav" aria-label="Você está aqui" className={s.crumb}>
      <ol className={s.crumbList}>
        {items.map((it, i) => (
          <li key={it.href + it.label}>
            {i < items.length - 1 ? <Link href={it.href}>{it.label}</Link> : <span aria-current="page">{it.label}</span>}
          </li>
        ))}
      </ol>
    </Container>
  );
}

export function Steps({ title, items }: { title: string; items: { title: string; body: string }[] }) {
  return (
    <Section>
      <Container narrow>
        <h2 className={s.h2}>{title}</h2>
        <ol className={s.steps}>
          {items.map((it) => (
            <li key={it.title}><strong>{it.title}</strong><span>{it.body}</span></li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

export type Plan = { name: string; price: string; body: string; features: string[]; highlight?: boolean };
export function PlanCards({ plans }: { plans: Plan[] }) {
  return (
    <Section>
      <Container>
        <div className={`${s.grid} ${s.grid3}`}>
          {plans.map((p) => (
            <article key={p.name} className={`${s.plan} ${p.highlight ? s.planHi : ""}`}>
              <h2 className={s.planName}>{p.name}</h2>
              {p.highlight ? <Badge tone="accent">Mais escolhido</Badge> : null}
              <p className={s.price}>{p.price}</p>
              <p className={s.cardDesc}>{p.body}</p>
              <ul className={s.planList}>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
              <ButtonLink href="/contato" variant={p.highlight ? "primary" : "secondary"}>Fale com vendas</ButtonLink>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/** Wide table scrolls inside its own box; the page never scrolls sideways. */
export function ComparisonTable({ caption, columns, rows }: { caption: string; columns: string[]; rows: { label: string; values: string[] }[] }) {
  return (
    <Section>
      <Container>
        <h2 className={s.h2}>{caption}</h2>
        <div className={s.tableWrap} tabIndex={0} role="region" aria-label={caption}>
          <table className={s.table}>
            <thead><tr><th scope="col">Recurso</th>{columns.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
            <tbody>{rows.map((r) => <tr key={r.label}><th scope="row">{r.label}</th>{r.values.map((v, i) => <td key={i}>{v}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </Container>
    </Section>
  );
}

export function OrgGrid({ title, people }: { title: string; people: { role: string; name: string; focus: string; areas: string; tone?: "green" | "purple" }[] }) {
  return (
    <Section>
      <Container>
        <h2 className={s.h2}>{title}</h2>
        <div className={`${s.grid} ${s.grid3}`}>
          {people.map((p) => (
            <article key={p.name} className={`${s.org} ${p.tone ? s[`org_${p.tone}`] : ""}`}>
              <p className={s.eyebrow}>{p.role}</p>
              <h3 className={s.orgName}>{p.name}</h3>
              <p className={s.orgFocus}>{p.focus}</p>
              <p className={s.orgAreas}>{p.areas}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function Prose({ blocks }: { blocks: { h: string; p: string[] }[] }) {
  return (
    <Section>
      <Container narrow className={s.prose}>
        {blocks.map((b) => (
          <div key={b.h}>
            <h2>{b.h}</h2>
            {b.p.map((t, i) => <p key={i}>{t}</p>)}
          </div>
        ))}
      </Container>
    </Section>
  );
}

