"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useContactModal } from "@/components/sections/ContactModalProvider";
import type { Dictionary } from "@/types/dictionary";
import { buildNavLinks } from "@/lib/navigation";
import { cn } from "@/lib/utils";

// Which home section each nav tab should light up for while scrolling. The
// "portfolio" tab links out to /proyectos, but on the home it tracks the
// featured-projects block (id="proyectos").
const NAV_SECTION_ID: Record<string, string> = {
  portfolio: "proyectos",
  experiencia: "experiencia",
  "sobre-mi": "sobre-mi",
  contacto: "contacto",
};

export function Header({ dict }: { dict: Dictionary }) {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const openContact = useContactModal();

  const navLinks = buildNavLinks(dict);
  const base = dict.locale === "en" ? "/en" : "";
  const homePath = base || "/";
  const portfolioPath = `${base}/proyectos`;
  const servicesPath = `${base}/servicios`;
  const otherLocaleHref =
    dict.locale === "en" ? pathname.replace(/^\/en/, "") || "/" : pathname === "/" ? "/en" : `/en${pathname}`;

  useEffect(() => {
    if (pathname !== homePath) return;

    const tracked = navLinks
      .map((link) => {
        const el = document.getElementById(NAV_SECTION_ID[link.id] ?? link.id);
        return el ? { linkId: link.id, el } : null;
      })
      .filter((item): item is { linkId: string; el: HTMLElement } => item !== null);

    const intersecting = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const match = tracked.find((item) => item.el === entry.target);
          if (!match) return;
          if (entry.isIntersecting) intersecting.add(match.linkId);
          else intersecting.delete(match.linkId);
        });

        const current = navLinks.find((link) => intersecting.has(link.id));
        setActiveId(current ? current.id : "");
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    tracked.forEach((item) => observer.observe(item.el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const isActive = (linkId: string) => {
    if (linkId === "portfolio" && pathname === portfolioPath) return true;
    if (linkId === "servicios" && pathname === servicesPath) return true;
    return activeId === linkId;
  };
  const tabLinks = navLinks.filter((link) => link.id !== "contacto");
  const contactLink = navLinks.find((link) => link.id === "contacto");

  const linkClass = (id: string) =>
    cn(
      "font-mono text-xs font-medium uppercase tracking-wider underline-offset-[6px] transition-colors duration-300",
      isActive(id) ? "text-accent underline decoration-accent decoration-2" : "text-text hover:text-accent",
    );

  return (
    <header className="sticky top-0 z-50 border-b border-accent-support/30 bg-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 md:px-10">
        <Link href={`${base}/#hero`} className="font-heading text-sm font-semibold tracking-tight text-text">
          Micaela Auzmendi
        </Link>

        <nav aria-label={dict.nav.mainNav} className="hidden items-center gap-7 md:flex">
          {tabLinks.map((link) => (
            <Link key={link.id} href={link.href} aria-current={isActive(link.id) ? "true" : undefined} className={linkClass(link.id)}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {contactLink ? (
            <button
              type="button"
              onClick={openContact}
              className="hidden rounded-full bg-text px-5 py-2 font-mono text-xs uppercase tracking-wider text-bg transition-colors duration-300 hover:bg-accent md:inline-flex"
            >
              {contactLink.label}
            </button>
          ) : null}
          <Link
            href={otherLocaleHref}
            aria-label={dict.nav.switchToLanguageLabel}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-accent-support/50 font-mono text-xs text-text transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            {dict.nav.switchToLanguageShort}
          </Link>
          <ThemeToggle dict={dict} />
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-accent-support/50 text-text md:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            aria-label={dict.nav.mobileNav}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-accent-support/30 md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {tabLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-2 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-text hover:bg-surface-muted hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}

              {contactLink ? (
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    openContact();
                  }}
                  className="mt-2 rounded-full bg-text px-4 py-2.5 text-center font-mono text-xs uppercase tracking-wider text-bg"
                >
                  {contactLink.label}
                </button>
              ) : null}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
