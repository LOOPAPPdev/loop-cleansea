import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { footerColumns, nav } from "@/content";
import { Footer, Header } from "@/design-system/composites";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Loop Consultoria", template: "%s · Loop Consultoria" },
  description: "Consultoria full stack: estratégia, operações, dados e engenharia.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>
        <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
        <Header groups={nav} cta={{ label: "Fale com vendas", href: "/contato" }} />
        <main id="conteudo" tabIndex={-1}>{children}</main>
        <Footer columns={footerColumns} />
      </body>
    </html>
  );
}
