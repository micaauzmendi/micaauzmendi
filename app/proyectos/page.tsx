import type { Metadata } from "next";
import { ProyectosPageContent } from "@/components/pages/ProyectosPageContent";
import { getDictionary } from "@/data/dictionaries";
import { formatTemplate } from "@/lib/format";

const dict = getDictionary("es");

export const metadata: Metadata = {
  title: dict.portfolioPage.eyebrow,
  description: formatTemplate(dict.portfolioPage.title, { count: dict.projects.length }),
};

export default function ProyectosPage() {
  return <ProyectosPageContent dict={dict} />;
}
