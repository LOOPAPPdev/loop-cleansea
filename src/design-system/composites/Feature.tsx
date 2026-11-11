import type { Cta } from "@/content";
import { ButtonLink, Container, Section } from "../primitives";
import s from "./composites.module.css";

export function SectionIntro({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Section>
      <Container className={s.intro}>
        <h2 className={s.introTitle}>{title}</h2>
        <p className={s.introSub}>{subtitle}</p>
      </Container>
    </Section>
  );
}

type Media = "integrations" | "badges" | "data";
const MEDIA: Record<Media, { tone: string; dots: string[]; big: number; alt: string }> = {
  integrations: { tone: "fm_blue", dots: ["CRM", "ERP", "Loop", "BI", "Docs"], big: 2, alt: "Ferramentas conectadas à Loop" },
  badges: { tone: "fm_green", dots: ["ISO", "LGPD", "SOC"], big: -1, alt: "Selos de conformidade" },
  data: { tone: "fm_slate", dots: ["Dados", "Fonte", "Citação"], big: 1, alt: "Respostas com fonte citada" },
};

/** Wide media block + heading + body + optional CTA. */
export function FeatureMedia({ title, body, media = "data", cta }: { title: string; body: string; media?: Media; cta?: Cta }) {
  const m = MEDIA[media];
  return (
    <Section>
      <Container className={s.feat}>
        <div className={`${s.fm} ${s[m.tone]}`} role="img" aria-label={m.alt}>
          {m.dots.map((d, i) => (
            <span key={d} className={`${s.dot} ${i === m.big ? s.dotLg : ""}`} aria-hidden="true">{d}</span>
          ))}
        </div>
        <h3 className={s.featHeading}>{title}</h3>
        <p className={s.featBody}>{body}</p>
        {cta ? <ButtonLink href={cta.href}>{cta.label}</ButtonLink> : null}
      </Container>
    </Section>
  );
}

export function CtaBand({ title, cta }: { title: string; cta: Cta }) {
  return (
    <Section>
      <Container>
        <div className={s.band}>
          <h2 className={s.bandTitle}>{title}</h2>
          <ButtonLink href={cta.href} size="lg">{cta.label}</ButtonLink>
        </div>
      </Container>
    </Section>
  );
}

export function Quote({ text, author }: { text: string; author: string }) {
  return (
    <Section>
      <Container>
        <figure className={s.quote}>
          <blockquote className={s.quoteText}>“{text}”</blockquote>
          <figcaption className={s.quoteBy}>{author}</figcaption>
        </figure>
      </Container>
    </Section>
  );
}
