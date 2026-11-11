"use client";
import { useState, type FormEvent } from "react";
import { Button, Container, Field } from "@/design-system/primitives";
import { Hero } from "@/design-system/composites";
import s from "./templates.module.css";

type Errors = Partial<Record<"nome" | "email" | "empresa", string>>;

function validate(d: FormData): Errors {
  const e: Errors = {};
  if (!String(d.get("nome") ?? "").trim()) e.nome = "Preencha seu nome.";
  const email = String(d.get("email") ?? "").trim();
  if (!email) e.email = "Preencha seu e-mail.";
  else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Use um e-mail no formato nome@empresa.com.";
  if (!String(d.get("empresa") ?? "").trim()) e.empresa = "Preencha o nome da empresa.";
  return e;
}

/**
 * WHEN the visitor submits with errors, THEN each field shows its error as text
 * AND focus moves to the first invalid field. Prototype: nothing is sent.
 */
export function ContactTemplate() {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const e = validate(new FormData(form));
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      form.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setState("sending");
    await new Promise((r) => setTimeout(r, 600));
    setState("done");
  }

  return (
    <>
      <Hero align="start" title="Fale com a Loop" subtitle="Lorem ipsum dolor sit amet. Respondemos em até [A DEFINIR] dias úteis." />
      <Container>
        <form className={s.form} noValidate onSubmit={onSubmit}>
          <Field label="Nome" name="nome" autoComplete="name" required error={errors.nome} />
          <Field label="E-mail corporativo" name="email" type="email" autoComplete="email" required error={errors.email} />
          <Field label="Empresa" name="empresa" autoComplete="organization" required error={errors.empresa} />
          <Field label="Cargo" name="cargo" autoComplete="organization-title" hint="Opcional" />
          <Field label="Qual é o desafio?" name="mensagem" multiline hint="Opcional" />
          <Button type="submit" loading={state === "sending"} className={s.submit}>
            {state === "sending" ? "Enviando…" : "Enviar mensagem"}
          </Button>
          <div role="status" aria-live="polite">
            {state === "done" ? <p className={s.ok}>Mensagem pronta. Neste protótipo nada foi enviado.</p> : null}
          </div>
        </form>
        <p className={s.note}>Protótipo: o formulário ainda não envia dados.</p>
      </Container>
    </>
  );
}
