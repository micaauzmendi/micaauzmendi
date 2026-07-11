import type { Dictionary } from "@/types/dictionary";

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

/**
 * A deliberately short, single-landing nav: everything lives on the home page
 * now. "Inicio" jumps to the top, then the work and the experience, followed by
 * the "Hablemos" contact button (handled separately in the Header). Every tab is
 * a home anchor — the standalone /proyectos and /servicios pages are hidden for
 * now (see app/proyectos + lib/navigation history) but their code still exists.
 */
export function buildNavLinks(dict: Dictionary): NavLink[] {
  const base = dict.locale === "en" ? "/en" : "";

  return [
    { id: "inicio", label: dict.nav.inicio, href: `${base}/#hero` },
    { id: "portfolio", label: dict.nav.portfolio, href: `${base}/#proyectos` },
    // Temporarily hidden: standalone pages folded into the single home landing.
    // The /proyectos + /servicios pages still exist — restore their tabs here.
    // { id: "servicios", label: dict.nav.servicios, href: `${base}/servicios` },
    { id: "experiencia", label: dict.nav.experiencia, href: `${base}/#experiencia` },
    { id: "contacto", label: dict.nav.contacto, href: `${base}/#contacto` },
  ];
}
