import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import type { Dictionary } from "@/types/dictionary";

export function About({ dict }: { dict: Dictionary }) {
  return (
    <section id="sobre-mi" aria-labelledby="sobre-mi-heading" className="px-6 py-16 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Presentation — the portrait now lives only in the epilogue. */}
        <div className="max-w-3xl">
          <SectionHeading
            id="sobre-mi-heading"
            eyebrow={dict.about.eyebrow}
            title={dict.about.title}
            accent={dict.about.titleAccent}
          />

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary">{dict.profileSummary}</p>
        </div>

        {/* The path made visible: disciplines as connected stages on a timeline. */}
        <div className="mt-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">{dict.about.journeyLabel}</p>
          <Reveal delay={0.1} stagger className="mt-6 grid gap-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4 lg:gap-6">
            {dict.about.disciplines.map((discipline) => (
              <RevealItem key={discipline.title} className="relative border-t border-accent-support/40 pt-5">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-accent"
                />
                <span className="font-mono text-xs tracking-wider text-accent">{discipline.year}</span>
                <h3 className="mt-2 font-heading text-lg font-medium text-text">{discipline.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{discipline.description}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>

        {/* Stats without boxes — the accent-colored numbers carry the weight. */}
        <Reveal delay={0.15} stagger className="mt-16 grid max-w-4xl grid-cols-3 gap-6 sm:gap-10">
          {dict.stats.map((stat) => (
            <RevealItem key={stat.label}>
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                valueClassName="text-accent"
              />
            </RevealItem>
          ))}
        </Reveal>

        {/* Bare logos (no chips): larger for the employers, smaller for project clients. */}
        <div className="mt-14 space-y-8">
          <CompanyGroup
            label={dict.about.companiesLabel}
            companies={dict.about.companies}
            logoClass="h-12 max-w-[210px]"
            textClass="text-lg"
          />
          <CompanyGroup
            label={dict.about.projectsForLabel}
            companies={dict.about.projectsFor}
            logoClass="h-7 max-w-[120px]"
            textClass="text-sm"
          />
        </div>
      </div>
    </section>
  );
}

function CompanyGroup({
  label,
  companies,
  logoClass,
  textClass,
}: {
  label: string;
  companies: Dictionary["about"]["companies"];
  logoClass: string;
  textClass: string;
}) {
  return (
    <div className="text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">{label}</p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
        {companies.map((company) =>
          company.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={company.name}
              src={company.logo}
              alt={company.name}
              loading="lazy"
              className={`w-auto object-contain grayscale dark:brightness-0 dark:invert ${logoClass}`}
            />
          ) : (
            <span key={company.name} className={`font-heading font-medium text-text-secondary ${textClass}`}>
              {company.name}
            </span>
          ),
        )}
      </div>
    </div>
  );
}
