"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { NavGroup } from "@/content";
import { ButtonLink } from "../primitives";
import s from "./Header.module.css";

/**
 * Responsive site header.
 * - ≥1100px: inline groups; groups with children open a dropdown panel.
 * - <1100px: a "Menu" button opens a full-width panel; groups expand in place.
 * Behaviour: Esc closes and returns focus; click outside closes; route change
 * closes; body scroll is locked while the mobile panel is open.
 */
export function Header({ groups, cta }: { groups: NavGroup[]; cta: { label: string; href: string } }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<number | null>(null);
  const rootRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  // Close everything on navigation (adjust state during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
    setOpenGroup(null);
  }

  // Esc + click outside.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (openGroup !== null) {
        const btn = rootRef.current?.querySelector<HTMLButtonElement>(`[data-group="${openGroup}"]`);
        setOpenGroup(null);
        btn?.focus();
      } else if (mobileOpen) {
        setMobileOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [openGroup, mobileOpen]);

  // Lock page scroll behind the mobile panel.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Section anchors (/solucoes#areas) are never "the current page".
  const isCurrent = (href: string) => !href.includes("#") && pathname === href;

  return (
    <header ref={rootRef} className={s.header}>
      <div className={s.bar}>
        <Link href="/solucoes" className={s.brand}>
          <span className={s.mark} aria-hidden="true" />
          Loop Consultoria
        </Link>

        <button
          ref={menuBtnRef}
          type="button"
          className={s.menuButton}
          aria-expanded={mobileOpen}
          aria-controls="site-nav"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className={s.burger} data-open={mobileOpen} aria-hidden="true" />
          {mobileOpen ? "Fechar" : "Menu"}
        </button>

        <nav id="site-nav" aria-label="Principal" className={s.nav} data-open={mobileOpen}>
          <ul className={s.groups}>
            {groups.map((g, i) =>
              g.children ? (
                <li key={g.label} className={s.group}>
                  <button
                    type="button"
                    data-group={i}
                    className={s.groupButton}
                    aria-expanded={openGroup === i}
                    aria-controls={`nav-panel-${i}`}
                    onClick={() => setOpenGroup((cur) => (cur === i ? null : i))}
                  >
                    {g.label}
                    <svg className={s.chevron} width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                  <ul id={`nav-panel-${i}`} className={s.panel} hidden={openGroup !== i}>
                    {g.children.map((c) => (
                      <li key={c.href + c.label}>
                        <Link href={c.href} className={s.panelLink} aria-current={isCurrent(c.href) ? "page" : undefined}>
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={g.label} className={s.group}>
                  <Link href={g.href!} className={s.groupButton} aria-current={isCurrent(g.href!) ? "page" : undefined}>
                    {g.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
          <div className={s.mobileCta}>
            <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
          </div>
        </nav>

        <div className={s.desktopCta}>
          <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
        </div>
      </div>
    </header>
  );
}
