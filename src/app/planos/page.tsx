import type { Metadata } from "next";
import { PricingTemplate } from "@/templates";
export const metadata: Metadata = { title: "Planos" };
export default function Page() { return <PricingTemplate />; }
