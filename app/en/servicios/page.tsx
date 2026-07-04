import type { Metadata } from "next";
import { ServiciosPageContent } from "@/components/pages/ServiciosPageContent";
import { getDictionary } from "@/data/dictionaries";

const dict = getDictionary("en");

export const metadata: Metadata = {
  title: dict.services.eyebrow,
  description: dict.services.description,
};

export default function ServiciosPageEn() {
  return <ServiciosPageContent dict={dict} />;
}
