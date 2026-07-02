import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { DecorativeLine } from "@/components/ui/DecorativeLine";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/types/dictionary";

export function About({ dict }: { dict: Dictionary }) {
  return (
    <section id="sobre-mi" aria-labelledby="sobre-mi-heading" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="sobre-mi-heading" eyebrow={dict.about.eyebrow} title={dict.about.title} />
        <Reveal delay={0.1} className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
          <p>{dict.profileSummary}</p>
        </Reveal>

        <DecorativeLine className="mt-16" animated />

        <Reveal delay={0.2} stagger className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {dict.stats.map((stat) => (
            <AnimatedCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
