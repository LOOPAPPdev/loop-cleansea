import type { Cta } from "@/content";
import { ButtonLink, Container } from "../primitives";
import s from "./composites.module.css";

/** Page opener. align="center" for hubs, "start" for inner pages. */
export function Hero({ eyebrow, title, subtitle, ctas = [], align = "center" }: { eyebrow?: string; title: string; subtitle?: string; ctas?: Cta[]; align?: "center" | "start" }) {
  return (
    <Container as="section" className={`${s.hero} ${align === "start" ? s.heroStart : ""}`}>
      {eyebrow ? <p className={s.eyebrow}>{eyebrow}</p> : null}
      <h1 className={s.heroTitle}>{title}</h1>
      {subtitle ? <p className={s.heroSub}>{subtitle}</p> : null}
      {ctas.length ? (
        <div className={s.ctas}>
          {ctas.map((c, i) => (
            <ButtonLink key={c.label} href={c.href} variant={c.variant ?? (i === 0 ? "primary" : "secondary")} size="lg">
              {c.label}
            </ButtonLink>
          ))}
        </div>
      ) : null}
    </Container>
  );
}
