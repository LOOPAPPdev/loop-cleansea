import Link from "next/link";
import type { ReactNode } from "react";
import type { CardItem } from "@/content";
import { Card, Container, IconTile, Section } from "../primitives";
import s from "./composites.module.css";

/** Card with a tinted illustration. The white label repeats the title, so tone is never the only cue. */
export function IllustratedCard({ item }: { item: CardItem }) {
  return (
    <Link href={item.href} className={s.card}>
      <div className={`${s.ill} ${s[`tone_${item.tone}`]}`} role="img" aria-label={`Ilustração: ${item.title}`}>
        <div className={s.pane}>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} style={{ top: `${14 + i * 18}%`, width: `${40 + ((i * 23) % 50)}%` }} />
          ))}
        </div>
        <span className={s.label} aria-hidden="true">{item.title}</span>
      </div>
      <h3 className={s.cardTitle}>{item.title}</h3>
      <p className={s.cardDesc}>{item.desc}</p>
    </Link>
  );
}

export function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return <h2 id={id} className={s.h2}>{children}</h2>;
}

/** Responsive grid: 4 → 2 → 1 columns, driven by min track width (no breakpoints needed). */
export function CardGrid({ id, title, items }: { id: string; title: string; items: CardItem[] }) {
  return (
    <Section aria-labelledby={`h-${id}`} id={id}>
      <Container>
        <SectionHeading id={`h-${id}`}>{title}</SectionHeading>
        <div className={s.grid}>{items.map((it) => <IllustratedCard key={it.href} item={it} />)}</div>
      </Container>
    </Section>
  );
}

/** Large media cards with a floating UI mock. */
export function MediaCardRow({ id, title, items }: { id: string; title: string; items: CardItem[] }) {
  return (
    <Section aria-labelledby={`h-${id}`} id={id}>
      <Container>
        <SectionHeading id={`h-${id}`}>{title}</SectionHeading>
        <div className={`${s.grid} ${s.grid3}`}>
          {items.map((it) => (
            <Link key={it.href} href={it.href} className={s.card}>
              <div className={s.media} role="img" aria-label={`Exemplo de ${it.title}`}>
                <div className={s.mock}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  <span className={s.mockBar}><span>+ Base de conhecimento</span><span aria-hidden="true">↑</span></span>
                </div>
              </div>
              <h3 className={s.cardTitle}>{it.title}</h3>
              <p className={s.cardDesc}>{it.desc}</p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/** Numbered capability cards. */
export function FeatureCards({ title, items }: { title: string; items: { title: string; body: string }[] }) {
  return (
    <Section>
      <Container>
        <h2 className={s.h2}>{title}</h2>
        <div className={`${s.grid} ${s.grid3}`}>
          {items.map((it, i) => (
            <Card key={it.title}>
              <IconTile tone="green">{String(i + 1).padStart(2, "0")}</IconTile>
              <h3 className={s.featTitle}>{it.title}</h3>
              <p className={s.cardDesc}>{it.body}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/** List of linked cards (partners, guides, jobs, news). */
export function LinkCards({ title, items, id }: { title: string; id?: string; items: { title: string; body: string; href: string; tag?: ReactNode }[] }) {
  return (
    <Section id={id}>
      <Container>
        <h2 className={s.h2}>{title}</h2>
        <ul className={s.listGrid}>
          {items.map((it) => (
            <li key={it.href}>
              <Link href={it.href} className={`${s.card} ${s.linkCard}`}>
                {it.tag}
                <h3 className={s.cardTitle}>{it.title}</h3>
                <p className={s.cardDesc}>{it.body}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
