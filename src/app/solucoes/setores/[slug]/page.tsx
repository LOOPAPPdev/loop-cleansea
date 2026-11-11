import { notFound } from "next/navigation";
import { findBySlug, setores, slugOf } from "@/content";
import { IndustryTemplate } from "@/templates";

type P = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => setores.map((a) => ({ slug: slugOf(a.href) }));
export async function generateMetadata({ params }: P) { return { title: findBySlug(setores, (await params).slug)?.title }; }
export default async function Page({ params }: P) {
  const item = findBySlug(setores, (await params).slug);
  if (!item) notFound();
  return <IndustryTemplate item={item} />;
}
