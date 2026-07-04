import { IconGrid } from "@/components/sections/IconGrid";
import { ChapterMarker } from "@/components/ui/ChapterMarker";
import { DotField } from "@/components/ui/DotField";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/types/dictionary";

export function Tools({ dict, numeral }: { dict: Dictionary; numeral: string }) {
  return (
    <section id="herramientas" aria-labelledby="herramientas-heading" className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32">
      <DotField />
      <div className="mx-auto max-w-6xl">
        <ChapterMarker
          id="herramientas-heading"
          numeral={numeral}
          kicker={dict.book.chapterKicker}
          label={dict.tools.eyebrow}
          title={dict.tools.title}
          tags={dict.tools.tags}
        />

        <Reveal stagger className="mt-14 flex flex-wrap gap-x-8 gap-y-6 sm:gap-x-12">
          <IconGrid items={dict.toolsItems} />
        </Reveal>
      </div>
    </section>
  );
}
