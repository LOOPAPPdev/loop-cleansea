import type { ReactNode } from "react";
import s from "./primitives.module.css";

export type BadgeTone = "neutral" | "accent" | "green" | "purple" | "warn";
export function Badge({ tone = "neutral", children }: { tone?: BadgeTone; children: ReactNode }) {
  return <span className={`${s.badge} ${s[`badge_${tone}`]}`}>{children}</span>;
}
