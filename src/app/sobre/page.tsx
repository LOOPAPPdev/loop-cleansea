import type { Metadata } from "next";
import { AboutTemplate } from "@/templates";
export const metadata: Metadata = { title: "Sobre" };
export default function Page() { return <AboutTemplate />; }
