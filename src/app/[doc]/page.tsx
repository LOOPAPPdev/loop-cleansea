import { notFound } from "next/navigation";
import { ArticleTemplate } from "@/templates";

const DOCS: Record<string, string> = { privacidade: "Privacidade", termos: "Termos de uso", cookies: "Cookies", integracoes: "Integrações" };
type P = { params: Promise<{ doc: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(DOCS).map((doc) => ({ doc }));
export async function generateMetadata({ params }: P) { return { title: DOCS[(await params).doc] }; }
export default async function Page({ params }: P) {
  const title = DOCS[(await params).doc];
  if (!title) notFound();
  return <ArticleTemplate title={title} />;
}
