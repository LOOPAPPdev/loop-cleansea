import { areas, type CardItem } from "@/content";
import { Breadcrumb, CardGrid, CtaBand, Faq, FeatureCards, FeatureMedia, Hero, Quote, StatTiles } from "@/design-system/composites";
import { FAQ, QUOTE, SALES, STATS, features } from "./shared";

const LOREM = "Lorem ipsum dolor sit amet.";

export function TeamTemplate({ item }: { item: CardItem }) {
  return (
    <>
      <Breadcrumb items={[{ label: "Soluções", href: "/solucoes" }, { label: "Áreas", href: "/solucoes#areas" }, { label: item.title, href: item.href }]} />
      <Hero align="start" eyebrow={`Área · ${item.title}`} title={`Lorem ipsum para ${item.title}`} subtitle={item.desc} ctas={[SALES, { label: "Ver workflows", href: `${item.href}/workflows`, variant: "secondary" }]} />
      <FeatureCards title="Lorem ipsum dolor" items={features(3)} />
      <FeatureMedia media="integrations" title="Conectores lorem ipsum" body={LOREM} cta={{ label: "Ver parceiros", href: "/parceiros" }} />
      <StatTiles items={STATS} />
      <Quote {...QUOTE} />
      <Faq items={FAQ} />
      <CtaBand title="Lorem ipsum dolor sit amet consectetur" cta={SALES} />
    </>
  );
}

export function WorkflowsTemplate({ item }: { item: CardItem }) {
  return (
    <>
      <Breadcrumb items={[{ label: "Soluções", href: "/solucoes" }, { label: item.title, href: item.href }, { label: "Workflows", href: `${item.href}/workflows` }]} />
      <Hero align="start" eyebrow={item.title} title={`Workflows de ${item.title}`} subtitle={LOREM} />
      <FeatureCards title="Áreas de workflow" items={features(4, "Workflow")} />
      <Quote {...QUOTE} />
      <CtaBand title="Lorem ipsum dolor sit amet consectetur" cta={SALES} />
    </>
  );
}

export function IndustryTemplate({ item }: { item: CardItem }) {
  return (
    <>
      <Breadcrumb items={[{ label: "Soluções", href: "/solucoes" }, { label: "Setores", href: "/solucoes#setores" }, { label: item.title, href: item.href }]} />
      <Hero align="start" eyebrow={`Setor · ${item.title}`} title={`Lorem ipsum em ${item.title}`} subtitle={item.desc} ctas={[{ label: "Fale com o time do setor", href: "/contato" }]} />
      <FeatureMedia media="data" title="Lorem ipsum dolor sit amet" body={LOREM} />
      <FeatureMedia media="badges" title="Conformidade lorem ipsum" body={LOREM} />
      <Quote {...QUOTE} />
      <CtaBand title="Lorem ipsum dolor sit amet consectetur" cta={SALES} />
    </>
  );
}

export function UseCaseTemplate({ item }: { item: CardItem }) {
  return (
    <>
      <Breadcrumb items={[{ label: "Soluções", href: "/solucoes" }, { label: "Casos de uso", href: "/solucoes#casos" }, { label: item.title, href: item.href }]} />
      <Hero align="start" eyebrow="Caso de uso" title={`${item.title} com lorem ipsum`} subtitle={item.desc} ctas={[{ label: "Agendar diagnóstico", href: "/contato" }]} />
      <FeatureCards title="Blocos de solução" items={features(3)} />
      <CardGrid id="exemplos" title="Exemplos por área" items={areas.slice(0, 4)} />
      <CtaBand title="Lorem ipsum dolor sit amet consectetur" cta={SALES} />
    </>
  );
}

export function SegmentTemplate({ name }: { name: string }) {
  return (
    <>
      <Hero eyebrow="Por que a Loop" title={`Lorem ipsum para ${name}`} subtitle={LOREM} ctas={[SALES]} />
      <FeatureCards title="Benefícios" items={features(3)} />
      <StatTiles items={STATS} />
      <Quote {...QUOTE} />
      <CtaBand title="Lorem ipsum dolor sit amet consectetur" cta={SALES} />
    </>
  );
}
