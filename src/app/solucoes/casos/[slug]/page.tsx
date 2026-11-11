import { notFound } from "next/navigation";
import { casos, findBySlug, slugOf } from "@/content";
import { UseCaseTemplate } from "@/templates";

type P = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => casos.map((a) => ({ slug: slugOf(a.href) }));
export async function generateMetadata({ params }: P) { return { title: findBySlug(casos, (await params).slug)?.title }; }
export default async function Page({ params }: P) {
  const item = findBySlug(casos, (await params).slug);
  if (!item) notFound();
  return <UseCaseTemplate item={item} />;
}
