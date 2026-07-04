import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TopBar } from "@/components/layout/TopBar";
import { ProjectIndexList } from "@/components/portfolio/ProjectIndexList";
import { BackToHome } from "@/components/ui/BackToHome";
import { DecorativeLine } from "@/components/ui/DecorativeLine";
import { Reveal } from "@/components/ui/Reveal";
import { SetHtmlLang } from "@/components/ui/SetHtmlLang";
import type { Dictionary } from "@/types/dictionary";
import { formatTemplate } from "@/lib/format";

export function ProyectosPageContent({ dict }: { dict: Dictionary }) {
  return (
    <>
      <SetHtmlLang locale={dict.locale} />
      <a href="#main-content" className="sr-only-focusable">
        {dict.nav.skipToContent}
      </a>
      <TopBar phrases={dict.ticker} />
      <Header dict={dict} />
      <main id="main-content" className="px-6 pb-24 pt-16 md:px-10 md:pt-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <BackToHome dict={dict} className="mb-6" />
            <div className="flex items-center gap-3">
              <DecorativeLine orientation="vertical" className="h-4" />
              <p className="font-mono font-medium text-xs uppercase tracking-[0.2em] text-accent">{dict.portfolioPage.eyebrow}</p>
            </div>
            <h1 className="mt-4 max-w-2xl font-heading text-3xl font-medium text-text sm:text-5xl">
              {formatTemplate(dict.portfolioPage.title, { count: dict.projects.length })}
            </h1>
            <p className="mt-5 max-w-xl text-base text-text-secondary">{dict.portfolioPage.description}</p>
            <a
              href={dict.personalInfo.behance.url}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-text-secondary transition-colors hover:text-accent"
            >
              {dict.portfolioPage.behanceLinkLabel}
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          </Reveal>

          <div className="mt-16">
            <ProjectIndexList projects={dict.projects} dict={dict} />
          </div>
        </div>
      </main>
      <Footer dict={dict} />
    </>
  );
}
