import type { Metadata } from "next";
import { ListingTemplate } from "@/templates";
export const metadata: Metadata = { title: "Notícias" };
export default function Page() { return <ListingTemplate title="Notícias" base="/noticias" />; }
