import { IconGrid } from "@/components/sections/IconGrid";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/types/dictionary";

export function Frontend({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="frontend"
      aria-labelledby="frontend-heading"
      className="bg-surface-muted/50 px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="frontend-heading" eyebrow={dict.frontend.eyebrow} title={dict.frontend.title} />

        <Reveal stagger className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          <IconGrid items={dict.frontendItems} />
        </Reveal>
      </div>
    </section>
  );
}
