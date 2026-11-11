import { LOREM, LOREM_LONG } from "@/content";
import { Badge } from "@/design-system/primitives";
import { Breadcrumb, ComparisonTable, CtaBand, Faq, FeatureCards, Hero, LinkCards, OrgGrid, PlanCards, Prose, Steps } from "@/design-system/composites";
import { FAQ, SALES, features, links, prose } from "./shared";

export function PricingTemplate() {
  return (
    <>
      <Hero title="Planos lorem ipsum" subtitle={LOREM} />
      <PlanCards
        plans={[
          { name: "Diagnóstico", price: "R$ [A DEFINIR]", body: LOREM, features: ["Lorem ipsum", "Dolor sit amet", "Consectetur"] },
          { name: "Projeto", price: "R$ [A DEFINIR]", body: LOREM, features: ["Lorem ipsum", "Dolor sit amet", "Consectetur"], highlight: true },
          { name: "Contínuo", price: "Sob consulta", body: LOREM, features: ["Lorem ipsum", "Dolor sit amet", "Consectetur"] },
        ]}
      />
      <ComparisonTable
        caption="Comparativo"
        columns={["Diagnóstico", "Projeto", "Contínuo"]}
        rows={["Lorem ipsum", "Dolor sit", "Amet elit", "Consectetur"].map((label, i) => ({ label, values: [i < 2 ? "Sim" : "—", "Sim", "Sim"] }))}
      />
      <Faq items={FAQ} />
      <CtaBand title="Lorem ipsum dolor sit amet consectetur" cta={SALES} />
    </>
  );
}

const tag = (i: number) => <Badge tone={(["accent", "green", "purple"] as const)[i % 3]}>Lorem</Badge>;
const tagged = (n: number, base: string, label?: string) => links(n, base, label).map((l, i) => ({ ...l, tag: tag(i) }));

export function DirectoryTemplate() {
  return (
    <>
      <Hero title="Parceiros Loop" subtitle={LOREM} />
      <LinkCards title="Ecossistema" items={tagged(6, "/parceiros", "Parceiro lorem")} />
      <CtaBand title="Seja um parceiro Loop" cta={{ label: "Fale conosco", href: "/contato" }} />
    </>
  );
}

export function ProfileTemplate({ slug }: { slug: string }) {
  return (
    <>
      <Breadcrumb items={[{ label: "Parceiros", href: "/parceiros" }, { label: "Perfil", href: `/parceiros/${slug}` }]} />
      <Hero align="start" eyebrow="Parceiro" title="Lorem Parceiro" subtitle={LOREM} />
      <Prose blocks={[{ h: "Sobre", p: [LOREM_LONG] }, { h: "Serviços", p: [LOREM] }, { h: "Casos", p: [LOREM] }]} />
      <CtaBand title="Fale com este parceiro" cta={{ label: "Entrar em contato", href: "/contato" }} />
    </>
  );
}

export function HubTemplate() {
  return (
    <>
      <Hero title="Aprender com a Loop" subtitle={LOREM} />
      <LinkCards id="guias" title="Guias e relatórios" items={tagged(6, "/guias", "Guia lorem")} />
      <CtaBand title="Receba novos guias" cta={{ label: "Assinar", href: "/contato" }} />
    </>
  );
}

export function ArticleTemplate({ title, crumbs }: { title: string; crumbs?: { label: string; href: string }[] }) {
  return (
    <>
      {crumbs ? <Breadcrumb items={crumbs} /> : null}
      <Hero align="start" title={title} subtitle={LOREM} />
      <Prose blocks={prose()} />
    </>
  );
}

export function AboutTemplate() {
  return (
    <>
      <Hero eyebrow="Saiba mais" title="Nossa missão é lorem ipsum dolor sit amet" subtitle={LOREM_LONG} />
      <Prose blocks={[{ h: "Como a Loop se organiza", p: [LOREM_LONG, LOREM] }]} />
      <LinkCards
        title="Empresa"
        items={[
          { title: "Princípios", body: LOREM, href: "/principios" },
          { title: "Carreiras", body: LOREM, href: "/carreiras" },
          { title: "Segurança", body: LOREM, href: "/seguranca" },
          { title: "Notícias", body: LOREM, href: "/noticias" },
        ]}
      />
      <OrgGrid
        title="Liderança"
        people={[
          { role: "Sócio fundador", name: "Nome 1", focus: "Lorem ipsum", areas: "Dolor · Sit · Amet", tone: "green" },
          { role: "Sócia fundadora", name: "Nome 2", focus: "Lorem ipsum", areas: "Dolor · Sit · Amet", tone: "purple" },
          { role: "Diretora de operações", name: "Nome 3", focus: "Lorem ipsum", areas: "Dolor · Sit · Amet" },
        ]}
      />
      <CtaBand title="Trabalhe com a Loop" cta={{ label: "Ver carreiras", href: "/carreiras" }} />
    </>
  );
}

export function CareersTemplate() {
  return (
    <>
      <Hero title="Carreiras na Loop" subtitle={LOREM} ctas={[{ label: "Ver vagas", href: "/carreiras/busca" }]} />
      <FeatureCards title="Nossos valores" items={features(3, "Valor")} />
      <LinkCards title="Vagas abertas" items={tagged(4, "/carreiras", "Consultor(a) lorem")} />
      <CtaBand title="Não achou sua vaga?" cta={{ label: "Fale conosco", href: "/contato" }} />
    </>
  );
}

export function JobPostTemplate({ slug }: { slug: string }) {
  return (
    <>
      <Breadcrumb items={[{ label: "Carreiras", href: "/carreiras" }, { label: "Vaga", href: `/carreiras/${slug}` }]} />
      <Hero align="start" eyebrow="Consultoria · Remoto" title="Lorem ipsum consultor(a)" subtitle={LOREM} ctas={[{ label: "Candidatar-se", href: "/contato" }]} />
      <Prose blocks={[{ h: "Responsabilidades", p: [LOREM_LONG] }, { h: "Requisitos", p: [LOREM] }]} />
    </>
  );
}

export function ProgramTemplate() {
  return (
    <>
      <Hero title="Residência Loop" subtitle={LOREM} ctas={[{ label: "Candidatar-se", href: "/contato" }]} />
      <Steps title="Como funciona" items={["Inscrição", "Seleção", "Seis meses de projeto", "Contratação"].map((t) => ({ title: t, body: LOREM }))} />
      <CtaBand title="Lorem ipsum dolor sit amet" cta={{ label: "Candidatar-se", href: "/contato" }} />
    </>
  );
}

export function ListingTemplate({ title, base }: { title: string; base: string }) {
  return (
    <>
      <Hero align="start" title={title} subtitle={LOREM} />
      <LinkCards title="Recentes" items={tagged(6, base)} />
    </>
  );
}
