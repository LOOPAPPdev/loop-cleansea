import type { Metadata } from "next";
import { JobSearchTemplate } from "@/templates";
export const metadata: Metadata = { title: "Vagas" };
export default function Page() { return <JobSearchTemplate />; }
