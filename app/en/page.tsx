import type { Metadata } from "next";
import { HomePageContent } from "@/components/pages/HomePageContent";
import { getDictionary } from "@/data/dictionaries";
import { getCaseImagesMap } from "@/lib/caseImages";

const dict = getDictionary("en");
const caseImages = getCaseImagesMap(dict.projects.map((project) => project.id));

export const metadata: Metadata = {
  title: dict.meta.title,
  description: dict.meta.description,
  openGraph: {
    title: dict.meta.title,
    description: dict.meta.description,
    locale: "en_US",
  },
  twitter: {
    title: dict.meta.title,
    description: dict.meta.description,
  },
};

export default function HomePageEn() {
  return <HomePageContent dict={dict} caseImages={caseImages} />;
}
