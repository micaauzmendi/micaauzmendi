import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/types/dictionary";
import { iconMap } from "@/lib/icons";

export function Philosophy({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="filosofia"
      aria-labelledby="filosofia-heading"
      className="bg-surface-muted/40 px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="filosofia-heading" eyebrow={dict.philosophy.eyebrow} title={dict.philosophy.title} />

        <Reveal stagger className="mt-16 grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2">
          {dict.philosophyItems.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <RevealItem key={item.title} className="border-t border-accent-support/30 pt-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-accent-support/40 bg-surface">
                  <Icon size={18} className="text-accent" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-semibold text-text">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">{item.description}</p>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
