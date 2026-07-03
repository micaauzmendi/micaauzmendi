import Image from "next/image";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { DotGrid } from "@/components/ui/DotGrid";
import { Highlight } from "@/components/ui/Highlight";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/types/dictionary";

const ABOUT_PHOTO = "/photos/retrato-principal.png";

export function About({ dict }: { dict: Dictionary }) {
  return (
    <section id="sobre-mi" aria-labelledby="sobre-mi-heading" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Photo with editorial decorations */}
        <Reveal variant="blurIn" className="relative mx-auto w-full max-w-sm lg:mx-0">
          <DotGrid rows={6} cols={6} className="absolute -right-5 -top-5 hidden opacity-60 md:grid" />
          <span aria-hidden="true" className="absolute -left-3 -top-3 z-10 h-10 w-10 border-l-2 border-t-2 border-accent" />
          <span aria-hidden="true" className="absolute -bottom-3 -right-3 z-10 h-10 w-10 border-b-2 border-r-2 border-accent" />
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={ABOUT_PHOTO}
              alt={dict.personalInfo.name}
              fill
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="object-cover"
            />
          </div>
          <span className="absolute bottom-4 left-4 bg-accent px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-bg">
            {dict.personalInfo.name}
          </span>
        </Reveal>

        {/* Presentation */}
        <div>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-accent">{dict.about.eyebrow}</p>
          <h2 id="sobre-mi-heading" className="font-heading text-4xl font-semibold leading-tight text-text sm:text-5xl">
            {dict.about.greetingPre} <Highlight>{dict.about.greetingName}</Highlight>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary">{dict.profileSummary}</p>

          <Reveal delay={0.15} stagger className="mt-10 grid grid-cols-3 gap-6 border-t border-accent-support/30 pt-8">
            {dict.stats.map((stat) => (
              <AnimatedCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
            ))}
          </Reveal>

          <div className="mt-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">{dict.about.companiesLabel}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-3">
              {dict.about.companies.map((company) => (
                <span
                  key={company}
                  className="font-heading text-lg font-semibold text-text-secondary transition-colors hover:text-text"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
