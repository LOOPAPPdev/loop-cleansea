import { ArticleTemplate } from "@/templates";
type P = { params: Promise<{ slug: string }> };
export default async function Page({ params }: P) {
  const { slug } = await params;
  return <ArticleTemplate title="Notícia lorem ipsum" crumbs={[{ label: "Notícias", href: "/noticias" }, { label: "Notícia", href: `/noticias/${slug}` }]} />;
}
