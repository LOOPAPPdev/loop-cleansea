"use client";
import { useState } from "react";
import { LOREM } from "@/content";
import { Badge, Container } from "@/design-system/primitives";
import { Breadcrumb, Hero, LinkCards } from "@/design-system/composites";
import s from "./templates.module.css";

const AREAS = ["Todas", "Consultoria", "Engenharia", "Design", "Dados"] as const;
const JOBS = Array.from({ length: 8 }, (_, i) => ({ area: AREAS[1 + (i % 4)], title: `Vaga lorem ${i + 1}`, href: `/carreiras/vaga-${i + 1}` }));

/** Filter chips are toggle buttons (aria-pressed); the result count is announced. */
export function JobSearchTemplate() {
  const [area, setArea] = useState<(typeof AREAS)[number]>("Todas");
  const shown = JOBS.filter((j) => area === "Todas" || j.area === area);
  return (
    <>
      <Breadcrumb items={[{ label: "Carreiras", href: "/carreiras" }, { label: "Vagas", href: "/carreiras/busca" }]} />
      <Hero align="start" title="Vagas" subtitle={LOREM} />
      <Container>
        <div role="group" aria-label="Filtrar por área" className={s.chips}>
          {AREAS.map((a) => (
            <button key={a} type="button" className={s.chip} aria-pressed={a === area} onClick={() => setArea(a)}>{a}</button>
          ))}
        </div>
        <p role="status" className={s.count}>{shown.length} vagas</p>
      </Container>
      <LinkCards title="Resultados" items={shown.map((j) => ({ title: j.title, body: LOREM, href: j.href, tag: <Badge tone="accent">{j.area}</Badge> }))} />
    </>
  );
}
