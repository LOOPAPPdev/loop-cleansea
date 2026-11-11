import { notFound } from "next/navigation";
import { SegmentTemplate } from "@/templates";

const SEGMENTS: Record<string, string> = { empresas: "médias e grandes empresas", "pequenas-empresas": "pequenas empresas" };
type P = { params: Promise<{ segmento: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(SEGMENTS).map((segmento) => ({ segmento }));
export async function generateMetadata({ params }: P) { return { title: `Por que a Loop · ${SEGMENTS[(await params).segmento]}` }; }
export default async function Page({ params }: P) {
  const name = SEGMENTS[(await params).segmento];
  if (!name) notFound();
  return <SegmentTemplate name={name} />;
}
