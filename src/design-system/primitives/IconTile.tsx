import type { ReactNode } from "react";
import s from "./primitives.module.css";

/** 44px square for an icon or index. Decorative: hidden from assistive tech. */
export function IconTile({ tone = "neutral", children }: { tone?: "neutral" | "green"; children: ReactNode }) {
  return <span className={`${s.tile} ${tone === "green" ? s.tile_green : ""}`} aria-hidden="true">{children}</span>;
}
