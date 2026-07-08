"use client";

import Link from "next/link";
import { BehanceIcon } from "@/components/ui/BehanceIcon";
import { LinkedinIcon } from "@/components/ui/LinkedinIcon";
import { useContactModal } from "@/components/sections/ContactModalProvider";
import type { Dictionary } from "@/types/dictionary";

export function Footer({ dict }: { dict: Dictionary }) {
  const base = dict.locale === "en" ? "/en" : "";
  const openContact = useContactModal();

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
                className="inline-flex items-center gap-2 text-text-secondary transition-colors hover:text-accent"
              >
                <LinkedinIcon size={14} /> {dict.cta.linkedinLabel}
              </a>
            </li>
            <li>
              <a
                href={dict.personalInfo.behance.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-text-secondary transition-colors hover:text-accent"
              >
                <BehanceIcon size={14} /> {dict.cta.behanceLabel}
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
          <button
            type="button"
            onClick={openContact}
            className="mt-4 inline-flex rounded-full bg-text px-5 py-2 font-mono text-xs uppercase tracking-wider text-bg transition-colors duration-300 hover:bg-accent"
          >
            {dict.hero.ctaContact}
          </button>
        </div>
      </div>

      {/* Oversized, faded signature — her name, sized to sit fully within the viewport. */}
      <p
        aria-hidden="true"
        className="pointer-events-none select-none whitespace-nowrap text-center font-heading text-[9vw] font-semibold leading-none text-accent/15"
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
