import { JobPostTemplate } from "@/templates";
type P = { params: Promise<{ slug: string }> };
export default async function Page({ params }: P) {
  const { slug } = await params;
  return <JobPostTemplate slug={slug} />;
}
