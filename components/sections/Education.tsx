import { SectionHeading } from "@/components/ui/SectionHeading";
import { DecorativeLine } from "@/components/ui/DecorativeLine";
import { GridField } from "@/components/ui/GridField";
import { GridSnappedRules } from "@/components/ui/GridSnappedRules";
import { HoverLift } from "@/components/ui/HoverLift";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/types/dictionary";

export function Education({ dict }: { dict: Dictionary }) {
  const { educationData, educationUi } = dict;

  return (
    <section id="formacion" aria-labelledby="formacion-heading" className="relative overflow-hidden px-6 py-16 md:px-10 md:py-32">
      <GridField />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="formacion-heading"
          eyebrow={dict.education.eyebrow}
          title={dict.education.title}
          accent={dict.education.titleAccent}
          description={dict.education.description}
        />

        <div className="relative mt-14">
          {/* Divider rules snapped to the 40px cuadrillé so they land on grid lines. */}
          <GridSnappedRules selector="[data-edu-col]" />
          <Reveal delay={0.1} className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            <div data-edu-col>
              <h3 className="font-mono font-medium text-xs uppercase tracking-wider text-accent">{educationUi.degree}</h3>
              <HoverLift className="group relative z-0 mt-3 hover:z-10">
                <p className="font-heading text-lg font-medium text-text transition-colors duration-300 group-hover:text-accent">{educationData.degree.title}</p>
                <p className="mt-1 text-sm text-text-secondary">{educationData.degree.institution}</p>
                <p className="mt-1 font-mono text-xs text-text-muted">{educationData.degree.period}</p>
              </HoverLift>
            </div>

            <div data-edu-col className="sm:pl-10">
              <h3 className="font-mono font-medium text-xs uppercase tracking-wider text-accent">{educationUi.certifications}</h3>
              <ul className="mt-3 space-y-4">
                {educationData.certifications.map((cert) => (
                  <li key={cert.title}>
                    <HoverLift className="group relative z-0 hover:z-10">
                      <p className="text-sm font-medium text-text transition-colors duration-300 group-hover:text-accent">{cert.title}</p>
                      <p className="font-mono text-xs text-text-muted">{cert.period}</p>
                    </HoverLift>
                  </li>
                ))}
              </ul>
            </div>

            <div data-edu-col className="sm:pl-10">
              <h3 className="font-mono font-medium text-xs uppercase tracking-wider text-accent">{educationUi.languages}</h3>
              <ul className="mt-3 space-y-2">
                {educationData.languages.map((lang) => (
                  <li key={lang.language}>
                    <HoverLift className="group relative z-0 text-sm text-text-secondary transition-colors duration-300 hover:z-10 hover:text-accent">
                      {lang.language} <span className="text-text-muted">— {lang.level}</span>
                    </HoverLift>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
        <DecorativeLine className="mt-16" animated />
      </div>
    </section>
  );
}
