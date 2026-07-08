import { IconGrid } from "@/components/sections/IconGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DotField } from "@/components/ui/DotField";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/types/dictionary";

/**
 * Tools + Frontend, merged into one "what I work with" section: the design and
 * product tools first, then a labeled Frontend subgroup for the code side. Keeps
 * both toolsets identifiable while collapsing them into a single block.
 */
export function Tools({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="herramientas"
      aria-labelledby="herramientas-heading"
      className="relative overflow-hidden bg-surface-muted/50 px-6 py-16 md:px-10 md:py-32"
    >
      <DotField />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="herramientas-heading"
          eyebrow={dict.tools.eyebrow}
          title={dict.tools.title}
          accent={dict.tools.titleAccent}
        />

        <Reveal stagger className="mt-14 flex flex-wrap gap-x-8 gap-y-6 sm:gap-x-12">
          <IconGrid items={dict.toolsItems} />
        </Reveal>

        <div className="mt-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">{dict.frontend.eyebrow}</p>
          <Reveal stagger className="mt-6 flex flex-wrap gap-x-8 gap-y-6 sm:gap-x-12">
            <IconGrid items={dict.frontendItems} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
