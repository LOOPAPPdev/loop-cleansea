import type { Metadata } from "next";
import { ContactTemplate } from "@/templates";
export const metadata: Metadata = { title: "Contato" };
export default function Page() { return <ContactTemplate />; }
