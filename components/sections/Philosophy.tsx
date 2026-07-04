import { ChapterMarker } from "@/components/ui/ChapterMarker";
import { DotField } from "@/components/ui/DotField";
import { MotionIconTile } from "@/components/ui/MotionIconTile";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import type { Dictionary } from "@/types/dictionary";

export function Philosophy({ dict, numeral }: { dict: Dictionary; numeral: string }) {
  return (
    <section
      id="filosofia"
      aria-labelledby="filosofia-heading"
      className="relative overflow-hidden bg-surface-muted/40 px-6 py-24 md:px-10 md:py-32"
    >
      <DotField />

      <div className="mx-auto max-w-6xl">
        <ChapterMarker
          id="filosofia-heading"
          numeral={numeral}
          kicker={dict.book.chapterKicker}
          label={dict.philosophy.eyebrow}
          title={dict.philosophy.title}
          tags={dict.philosophy.tags}
        />

        <Reveal stagger className="mt-16 grid grid-cols-1 gap-x-12 gap-y-14 sm:grid-cols-2">
          {dict.philosophyItems.map((item, index) => {
            return (
              <RevealItem key={item.title} variant="blurIn" className="group">
                <MotionIconTile icon={item.icon} index={index} />
                <h3 className="mt-5 font-heading text-xl font-medium text-text">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">{item.description}</p>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
