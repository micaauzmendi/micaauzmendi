import { ChapterMarker } from "@/components/ui/ChapterMarker";
import { DecorativeLine } from "@/components/ui/DecorativeLine";
import { GridField } from "@/components/ui/GridField";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/types/dictionary";

export function Education({ dict, numeral }: { dict: Dictionary; numeral: string }) {
  const { educationData, educationUi } = dict;

  return (
    <section id="formacion" aria-labelledby="formacion-heading" className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32">
      <GridField />
      <div className="mx-auto max-w-4xl">
        <ChapterMarker
          id="formacion-heading"
          numeral={numeral}
          kicker={dict.book.chapterKicker}
          label={dict.education.eyebrow}
          title={dict.education.title}
          tags={dict.education.tags}
          description={dict.education.description}
        />

        <Reveal delay={0.1} className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <h3 className="font-mono font-medium text-xs uppercase tracking-wider text-accent">{educationUi.degree}</h3>
            <p className="mt-3 font-heading text-lg font-medium text-text">{educationData.degree.title}</p>
            <p className="mt-1 text-sm text-text-secondary">{educationData.degree.institution}</p>
            <p className="mt-1 font-mono text-xs text-text-muted">{educationData.degree.period}</p>
          </div>

          <div className="sm:border-l sm:border-accent-support/40 sm:pl-10">
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

          <div className="sm:border-l sm:border-accent-support/40 sm:pl-10">
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
        <DecorativeLine className="mt-16" animated />
      </div>
    </section>
  );
}
