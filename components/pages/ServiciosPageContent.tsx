import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TopBar } from "@/components/layout/TopBar";
import { BackToHome } from "@/components/ui/BackToHome";
import { DecorativeLine } from "@/components/ui/DecorativeLine";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SetHtmlLang } from "@/components/ui/SetHtmlLang";
import { Tag } from "@/components/ui/Tag";
import { iconMap } from "@/lib/icons";
import type { Dictionary } from "@/types/dictionary";

/**
 * Services lives outside the narrative, on its own page (like the full
 * portfolio). It's the one commercial surface, kept away from the book so it
 * doesn't break the reading.
 */
export function ServiciosPageContent({ dict }: { dict: Dictionary }) {
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
              <p className="font-mono font-medium text-xs uppercase tracking-[0.2em] text-accent">{dict.services.eyebrow}</p>
            </div>
            <h1 className="mt-4 max-w-2xl font-heading text-3xl font-medium text-text sm:text-5xl">
              {dict.services.title}
            </h1>
            {dict.services.description ? (
              <p className="mt-5 max-w-xl text-base text-text-secondary">{dict.services.description}</p>
            ) : null}
          </Reveal>

          <Reveal stagger className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2">
            {dict.servicesItems.map((group) => {
              const Icon = iconMap[group.icon];
              return (
                <RevealItem key={group.category} className="border-t border-accent-support/30 pt-6">
                  <div className="flex items-center gap-3">
                    <Icon size={20} aria-hidden="true" className="text-accent" />
                    <h2 className="font-heading text-lg font-medium text-text">{group.category}</h2>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                </RevealItem>
              );
            })}
          </Reveal>
        </div>
      </main>
      <Footer dict={dict} />
    </>
  );
}
