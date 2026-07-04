import type { Dictionary } from "@/types/dictionary";

export interface NavLink {
  id: string;
  label: string;
  href: string;
  group: "journey" | "work";
}

/**
 * Nav links are grouped into two clusters: "journey" (about her — process,
 * experience, skills) and "work" (how to hire her — services, projects).
 * The contact CTA is rendered separately as a button, not part of either group.
 */
export function buildNavLinks(dict: Dictionary): NavLink[] {
  const base = dict.locale === "en" ? "/en" : "";

  return [
    { id: "sobre-mi", label: dict.nav.sobreMi, href: `${base}/#sobre-mi`, group: "journey" },
    { id: "proceso", label: dict.nav.proceso, href: `${base}/#proceso`, group: "journey" },
    { id: "experiencia", label: dict.nav.experiencia, href: `${base}/#experiencia`, group: "journey" },
    { id: "skills", label: dict.nav.skills, href: `${base}/#skills`, group: "journey" },
    { id: "servicios", label: dict.nav.servicios, href: `${base}/servicios`, group: "work" },
    { id: "portfolio", label: dict.nav.portfolio, href: `${base}/proyectos`, group: "work" },
    { id: "contacto", label: dict.nav.contacto, href: `${base}/#contacto`, group: "work" },
  ];
}
