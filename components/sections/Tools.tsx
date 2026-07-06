import { IconGrid } from "@/components/sections/IconGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DotField } from "@/components/ui/DotField";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/types/dictionary";

export function Tools({ dict }: { dict: Dictionary }) {
  return (
    <section id="herramientas" aria-labelledby="herramientas-heading" className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32">
      <DotField />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="herramientas-heading"
          eyebrow={dict.tools.eyebrow}
          title={dict.tools.title}
        />

        <Reveal stagger className="mt-14 flex flex-wrap gap-x-8 gap-y-6 sm:gap-x-12">
          <IconGrid items={dict.toolsItems} />
        </Reveal>
      </div>
    </section>
  );
}
