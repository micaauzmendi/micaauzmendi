import { ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Dictionary } from "@/types/dictionary";

export function Footer({ dict }: { dict: Dictionary }) {
  const base = dict.locale === "en" ? "/en" : "";

  const exploreLinks = [
    { label: dict.nav.sobreMi, href: `${base}/#sobre-mi` },
    { label: dict.nav.proceso, href: `${base}/#proceso` },
    { label: dict.nav.experiencia, href: `${base}/#experiencia` },
    { label: dict.nav.portfolio, href: `${base}/proyectos` },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-accent-support/30 bg-surface-muted/25 px-6 pt-16 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 pb-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-heading text-xl font-semibold text-text">{dict.personalInfo.name}</p>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-text-muted">{dict.personalInfo.title}</p>
        </div>

        <nav aria-label={dict.footer.exploreLabel}>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">{dict.footer.exploreLabel}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-text-secondary transition-colors hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">{dict.footer.connectLabel}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={dict.personalInfo.linkedin.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-text-secondary transition-colors hover:text-accent"
              >
                {dict.cta.linkedinLabel} <ExternalLink size={12} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={dict.personalInfo.behance.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-text-secondary transition-colors hover:text-accent"
              >
                {dict.cta.behanceLabel} <ExternalLink size={12} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={`mailto:${dict.personalInfo.email}`}
                className="text-text-secondary transition-colors hover:text-accent"
              >
                {dict.personalInfo.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">{dict.nav.contacto}</p>
          <Link
            href={`${base}/#contacto`}
            className="mt-4 inline-flex items-center gap-1.5 font-heading text-base font-semibold text-text transition-colors hover:text-accent"
          >
            {dict.hero.ctaContact} <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Oversized, faded influential phrase */}
      <p
        aria-hidden="true"
        className="pointer-events-none select-none whitespace-nowrap text-center font-heading text-[14vw] font-semibold leading-none text-accent/15"
      >
        {dict.footer.influentialPhrase}
      </p>

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 border-t border-accent-support/20 py-6 text-center md:flex-row md:text-left">
        <p className="font-mono text-xs uppercase tracking-wider text-text-muted">
          © {new Date().getFullYear()} {dict.personalInfo.name}
        </p>
        <p className="font-mono text-xs uppercase tracking-wider text-text-muted">{dict.footer.tagline}</p>
      </div>
    </footer>
  );
}
