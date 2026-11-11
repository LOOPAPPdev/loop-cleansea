import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import s from "./primitives.module.css";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";
type Common = { variant?: Variant; size?: Size; children: ReactNode; className?: string };

const cls = (v: Variant, z: Size, extra?: string) =>
  [s.btn, s[`btn_${v}`], s[`btn_${z}`], extra].filter(Boolean).join(" ");

/** Navigation that looks like a button. Use for links ("Fale com vendas"). */
export function ButtonLink({ href, variant = "primary", size = "md", children, className, ...rest }: Common & ComponentProps<typeof Link>) {
  return (
    <Link href={href} className={cls(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

/** Action button. Supports loading: sets aria-busy and blocks double submit. */
export function Button({ variant = "primary", size = "md", loading = false, children, className, disabled, type = "button", ...rest }: Common & { loading?: boolean } & ComponentProps<"button">) {
  return (
    <button type={type} className={cls(variant, size, className)} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {loading ? <span className={s.spinner} aria-hidden="true" /> : null}
      {children}
    </button>
  );
}
