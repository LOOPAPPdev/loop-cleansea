import type { ComponentProps } from "react";
import s from "./primitives.module.css";

export type CardVariant = "filled" | "outline" | "raised";
/** Surface container. filled = blue-gray on white; outline = border only; raised = white on gray. */
export function Card({ variant = "filled", className, ...rest }: { variant?: CardVariant } & ComponentProps<"div">) {
  return <div className={[s.card, s[`card_${variant}`], className].filter(Boolean).join(" ")} {...rest} />;
}
