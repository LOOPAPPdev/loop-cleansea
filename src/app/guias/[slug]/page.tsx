import { ArticleTemplate } from "@/templates";
type P = { params: Promise<{ slug: string }> };
export default async function Page({ params }: P) {
  const { slug } = await params;
  return <ArticleTemplate title="Guia lorem ipsum" crumbs={[{ label: "Aprender", href: "/aprender" }, { label: "Guia", href: `/guias/${slug}` }]} />;
}
