import type { Locale } from "@/types/dictionary";
import { en } from "./en";
import { es } from "./es";

export function getDictionary(locale: Locale) {
  return locale === "en" ? en : es;
}
