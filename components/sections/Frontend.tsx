import { IconGrid } from "@/components/sections/IconGrid";
import { ChapterMarker } from "@/components/ui/ChapterMarker";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/types/dictionary";

export function Frontend({ dict, numeral }: { dict: Dictionary; numeral: string }) {
  return (
    <section
      id="frontend"
      aria-labelledby="frontend-heading"
      className="bg-surface-muted/50 px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <ChapterMarker
          id="frontend-heading"
          numeral={numeral}
          kicker={dict.book.chapterKicker}
          label={dict.frontend.eyebrow}
          title={dict.frontend.title}
          tags={dict.frontend.tags}
          description={dict.frontend.description}
        />

        <Reveal stagger className="mt-14 flex flex-wrap gap-x-8 gap-y-6 sm:gap-x-12">
          <IconGrid items={dict.frontendItems} />
        </Reveal>
      </div>
    </section>
  );
}
