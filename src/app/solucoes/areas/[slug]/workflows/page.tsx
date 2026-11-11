import { notFound } from "next/navigation";
import { areas, findBySlug, slugOf } from "@/content";
import { WorkflowsTemplate } from "@/templates";

type P = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => areas.map((a) => ({ slug: slugOf(a.href) }));
export async function generateMetadata({ params }: P) { return { title: `Workflows · ${findBySlug(areas, (await params).slug)?.title}` }; }
export default async function Page({ params }: P) {
  const item = findBySlug(areas, (await params).slug);
  if (!item) notFound();
  return <WorkflowsTemplate item={item} />;
}
