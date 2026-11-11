import { LOREM, LOREM_LONG } from "@/content";

export const SALES = { label: "Fale com vendas", href: "/contato" };
export const STATS = [
  { value: "3×", label: "Lorem ipsum" },
  { value: "40%", label: "Dolor sit" },
  { value: "12 sem", label: "Amet elit" },
  { value: "98%", label: "Consectetur" },
];
export const FAQ = [1, 2, 3].map((i) => ({ q: `Lorem ipsum dolor sit amet ${i}?`, a: LOREM_LONG }));
export const QUOTE = { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.", author: "Nome Sobrenome · Cargo, Empresa" };
export const features = (n: number, prefix = "Lorem ipsum") => Array.from({ length: n }, (_, i) => ({ title: `${prefix} ${i + 1}`, body: LOREM }));
export const links = (n: number, base: string, label = "Lorem ipsum dolor") =>
  Array.from({ length: n }, (_, i) => ({ title: `${label} ${i + 1}`, body: LOREM, href: `${base}/item-${i + 1}` }));
export const prose = (n = 3) => Array.from({ length: n }, (_, i) => ({ h: `Lorem ipsum ${i + 1}`, p: [LOREM_LONG, LOREM] }));
