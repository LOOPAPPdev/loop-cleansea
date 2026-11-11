import type { ComponentProps, ElementType } from "react";
import s from "./primitives.module.css";

/** Centres content at --container width with the responsive gutter. */
export function Container({ as: Tag = "div", narrow, className, ...rest }: { as?: ElementType; narrow?: boolean } & ComponentProps<"div">) {
  return <Tag className={[s.container, narrow && s.narrow, className].filter(Boolean).join(" ")} {...rest} />;
}

/** Vertical rhythm for page sections. */
export function Section({ className, ...rest }: ComponentProps<"section">) {
  return <section className={[s.section, className].filter(Boolean).join(" ")} {...rest} />;
}
