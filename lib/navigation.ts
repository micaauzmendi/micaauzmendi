import type { Dictionary } from "@/types/dictionary";

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

/**
 * A deliberately short nav, ordered by what a recruiter weighs first: the work,
 * the services, the experience, then who she is — all in one row, followed by
 * the "Hablemos" contact button (handled separately in the Header).
 * Process/skills are intentionally left out to keep it focused (still reachable
 * by scrolling). Servicios is its own page; the rest are home anchors.
 */
export function buildNavLinks(dict: Dictionary): NavLink[] {
  const base = dict.locale === "en" ? "/en" : "";

  return [
    { id: "portfolio", label: dict.nav.portfolio, href: `${base}/proyectos` },
    // Temporarily hidden: Services now shows as a section inside the About area.
    // The standalone /servicios page still exists — uncomment to bring the tab back.
    // { id: "servicios", label: dict.nav.servicios, href: `${base}/servicios` },
    { id: "experiencia", label: dict.nav.experiencia, href: `${base}/#experiencia` },
    { id: "sobre-mi", label: dict.nav.sobreMi, href: `${base}/#sobre-mi` },
    { id: "contacto", label: dict.nav.contacto, href: `${base}/#contacto` },
  ];
}
