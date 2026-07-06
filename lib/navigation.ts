import type { Dictionary } from "@/types/dictionary";

export interface NavLink {
  id: string;
  label: string;
  href: string;
  group: "journey" | "work";
}

/**
 * A deliberately short nav, ordered by what a recruiter weighs first: the work
 * and the experience, then who she is. Process/skills are intentionally left
 * out of the top bar to keep it focused — they're still reachable by scrolling.
 * "journey" is her work; "work" is services. Contact is a separate button.
 */
export function buildNavLinks(dict: Dictionary): NavLink[] {
  const base = dict.locale === "en" ? "/en" : "";

  return [
    { id: "portfolio", label: dict.nav.portfolio, href: `${base}/proyectos`, group: "journey" },
    { id: "experiencia", label: dict.nav.experiencia, href: `${base}/#experiencia`, group: "journey" },
    { id: "sobre-mi", label: dict.nav.sobreMi, href: `${base}/#sobre-mi`, group: "journey" },
    { id: "servicios", label: dict.nav.servicios, href: `${base}/servicios`, group: "work" },
    { id: "contacto", label: dict.nav.contacto, href: `${base}/#contacto`, group: "work" },
  ];
}
