import { Hero } from "@/design-system/composites";
export default function NotFound() {
  return <Hero title="Página não encontrada" subtitle="Este endereço não existe. Volte para Soluções." ctas={[{ label: "Ir para Soluções", href: "/solucoes" }]} />;
}
