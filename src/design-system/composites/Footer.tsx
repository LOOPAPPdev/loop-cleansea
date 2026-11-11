import Link from "next/link";
import type { NavLink } from "@/content";
import { Container } from "../primitives";
import s from "./composites.module.css";

export function Footer({ columns }: { columns: { title: string; links: NavLink[] }[] }) {
  return (
    <footer className={s.footer}>
      <Container>
        <div className={s.footerCols}>
          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h2 className={s.footerTitle}>{c.title}</h2>
              <ul className={s.footerList}>
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={s.footerLink}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className={s.legal}>
          <span>© {new Date().getFullYear()} Loop Consultoria</span>
          <span>Protótipo · copy em lorem ipsum</span>
        </div>
      </Container>
    </footer>
  );
}
