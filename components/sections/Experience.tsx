import { ExperienceCard } from "@/components/sections/ExperienceCard";
import { ChapterMarker } from "@/components/ui/ChapterMarker";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import type { Dictionary } from "@/types/dictionary";

export function Experience({ dict, numeral }: { dict: Dictionary; numeral: string }) {
  return (
    <section id="experiencia" aria-labelledby="experiencia-heading" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-4xl">
        <ChapterMarker
          id="experiencia-heading"
          numeral={numeral}
          kicker={dict.book.chapterKicker}
          label={dict.experience.eyebrow}
          title={dict.experience.title}
          tags={dict.experience.tags}
          description={dict.experience.description}
        />

        <Reveal stagger className="relative mt-16 flex flex-col gap-14">
          <span aria-hidden="true" className="absolute left-0 top-2 h-full w-px bg-accent-support/40 sm:left-0" />
          {dict.experienceItems.map((entry) => (
            <RevealItem key={entry.id}>
              <ExperienceCard entry={entry} ui={dict.experienceUi} />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
