import { IconGrid } from "@/components/sections/IconGrid";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/types/dictionary";

export function Tools({ dict }: { dict: Dictionary }) {
  return (
    <section id="herramientas" aria-labelledby="herramientas-heading" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="herramientas-heading" eyebrow={dict.tools.eyebrow} title={dict.tools.title} />

        <Reveal stagger className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          <IconGrid items={dict.toolsItems} />
        </Reveal>
      </div>
    </section>
  );
}
