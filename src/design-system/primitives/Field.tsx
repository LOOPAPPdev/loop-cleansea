"use client";
import { useId, type ComponentProps } from "react";
import s from "./primitives.module.css";

type Base = { label: string; hint?: string; error?: string };

/** Label + input + hint/error. The error is text, linked with aria-describedby. */
export function Field({ label, hint, error, id, multiline, ...rest }: Base & { multiline?: boolean } & ComponentProps<"input"> & ComponentProps<"textarea">) {
  const auto = useId();
  const fid = id ?? auto;
  const msgId = `${fid}-msg`;
  const message = error ?? hint;
  const common = {
    id: fid,
    className: s.input,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": message ? msgId : undefined,
  };
  return (
    <div className={[s.field, error && s.field_error].filter(Boolean).join(" ")}>
      <label htmlFor={fid} className={s.label}>{label}</label>
      {multiline ? <textarea rows={4} {...common} {...(rest as ComponentProps<"textarea">)} /> : <input {...common} {...(rest as ComponentProps<"input">)} />}
      {message ? <span id={msgId} className={s.hint}>{message}</span> : null}
    </div>
  );
}
