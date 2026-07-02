import { DecorativeLine } from "@/components/ui/DecorativeLine";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/types/dictionary";
import { iconMap } from "@/lib/icons";

export function Process({ dict }: { dict: Dictionary }) {
  return (
    <section id="proceso" aria-labelledby="proceso-heading" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="proceso-heading" eyebrow={dict.process.eyebrow} title={dict.process.title} />

        <Reveal stagger className="mt-16 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-5">
          {dict.processSteps.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <RevealItem key={item.step} className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-accent-support/40 bg-surface-muted/60">
                  <Icon size={18} className="text-accent" aria-hidden="true" />
                </div>
                <p className="mt-4 font-mono text-xs text-accent-support">{item.step}</p>
                <h3 className="mt-2 font-heading text-lg font-semibold text-text">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.description}</p>
                {index < dict.processSteps.length - 1 ? (
                  <DecorativeLine
                    orientation="horizontal"
                    animated
                    className="absolute -right-3 top-5 hidden w-6 lg:block"
                  />
                ) : null}
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
