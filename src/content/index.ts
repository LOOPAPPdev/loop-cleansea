/**
 * Content layer (data-first). site-map.json is the single source of truth for
 * navigation, routes and page copy. Components never hard-code copy or links.
 */
import raw from "./site-map.json";
import type { Tone } from "@/design-system/tokens/tokens";

export type NavLink = { label: string; href: string; status?: string };
export type NavGroup = { label: string; href?: string; children?: NavLink[] };
export type CardItem = { title: string; desc: string; tone: Tone; href: string };
export type Cta = { label: string; href: string; variant?: "primary" | "secondary" };
export type HomeSection =
  | { id: string; component: "Hero"; title: string; subtitle: string; ctas: Cta[] }
  | { id: string; component: "CardGrid" | "MediaCardRow"; title: string; columns: number; items: CardItem[] }
  | { id: string; component: "SectionIntro"; title: string; subtitle: string }
  | { id: string; component: "FeatureMedia"; title: string; body: string; media?: string; cta?: Cta }
  | { id: string; component: "CtaBand"; title: string; ctas: Cta[] };

type Raw = {
  copyLimits: Record<string, { max: number; lines?: number }>;
  nav: { primary: NavGroup[] };
  pages: Record<string, { sections?: unknown }>;
  footer: { columns: { title: string; links: NavLink[] }[] };
};
const site = raw as unknown as Raw;

export const nav = site.nav.primary;
export const footerColumns = site.footer.columns;
export const copyLimits = site.copyLimits;
export const homeSections = site.pages["/solucoes"].sections as HomeSection[];

const items = (id: string) => (homeSections.find((s) => s.id === id) as { items: CardItem[] }).items;
export const areas = items("areas");
export const setores = items("setores");
export const casos = items("casos");

export const slugOf = (href: string) => href.split("/").pop() as string;
export const findBySlug = (list: CardItem[], slug: string) => list.find((i) => slugOf(i.href) === slug);

export const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
export const LOREM_LONG =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
