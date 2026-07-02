import type { Metadata } from "next";
import { HomePageContent } from "@/components/pages/HomePageContent";
import { getDictionary } from "@/data/dictionaries";

const dict = getDictionary("en");

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
  return <HomePageContent dict={dict} />;
}
