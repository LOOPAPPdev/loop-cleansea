import { homeSections } from "@/content";
import { CardGrid, CtaBand, FeatureMedia, Hero, MediaCardRow, SectionIntro } from "@/design-system/composites";

const MEDIA: Record<string, "integrations" | "badges" | "data"> = { integracoes: "integrations", seguranca: "badges", dados: "data" };

/** Home (/solucoes). Renders the sections listed in site-map.json, in order. */
export function HomeTemplate() {
  return (
    <>
      {homeSections.map((sec) => {
        switch (sec.component) {
          case "Hero":
            return <Hero key={sec.id} title={sec.title} subtitle={sec.subtitle} ctas={sec.ctas} />;
          case "CardGrid":
            return <CardGrid key={sec.id} id={sec.id} title={sec.title} items={sec.items} />;
          case "MediaCardRow":
            return <MediaCardRow key={sec.id} id={sec.id} title={sec.title} items={sec.items} />;
          case "SectionIntro":
            return <SectionIntro key={sec.id} title={sec.title} subtitle={sec.subtitle} />;
          case "FeatureMedia":
            return <FeatureMedia key={sec.id} title={sec.title} body={sec.body} media={MEDIA[sec.id] ?? "data"} cta={sec.cta} />;
          case "CtaBand":
            return <CtaBand key={sec.id} title={sec.title} cta={sec.ctas[0]} />;
        }
      })}
    </>
  );
}
