import { SectionHeading } from "@/components/ui/SectionHeading";
import { DecorativeLine } from "@/components/ui/DecorativeLine";
import { GridField } from "@/components/ui/GridField";
import { GridSnappedRules } from "@/components/ui/GridSnappedRules";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/types/dictionary";

export function Education({ dict }: { dict: Dictionary }) {
  const { educationData, educationUi } = dict;

  return (
    <section id="formacion" aria-labelledby="formacion-heading" className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32">
      <GridField />
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          id="formacion-heading"
          eyebrow={dict.education.eyebrow}
          title={dict.education.title}
          description={dict.education.description}
        />

        <div className="relative mt-14">
          {/* Divider rules snapped to the 40px cuadrillé so they land on grid lines. */}
          <GridSnappedRules selector="[data-edu-col]" />
          <Reveal delay={0.1} className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            <div data-edu-col>
              <h3 className="font-mono font-medium text-xs uppercase tracking-wider text-accent">{educationUi.degree}</h3>
              <p className="mt-3 font-heading text-lg font-medium text-text">{educationData.degree.title}</p>
              <p className="mt-1 text-sm text-text-secondary">{educationData.degree.institution}</p>
              <p className="mt-1 font-mono text-xs text-text-muted">{educationData.degree.period}</p>
            </div>

            <div data-edu-col className="sm:pl-10">
              <h3 className="font-mono font-medium text-xs uppercase tracking-wider text-accent">{educationUi.certifications}</h3>
              <ul className="mt-3 space-y-4">
                {educationData.certifications.map((cert) => (
                  <li key={cert.title}>
                    <p className="text-sm font-medium text-text">{cert.title}</p>
                    <p className="font-mono text-xs text-text-muted">{cert.period}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div data-edu-col className="sm:pl-10">
              <h3 className="font-mono font-medium text-xs uppercase tracking-wider text-accent">{educationUi.languages}</h3>
              <ul className="mt-3 space-y-2">
                {educationData.languages.map((lang) => (
                  <li key={lang.language} className="text-sm text-text-secondary">
                    {lang.language} <span className="text-text-muted">— {lang.level}</span>
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
