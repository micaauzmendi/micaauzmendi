import { IconGrid } from "@/components/sections/IconGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/types/dictionary";

export function Frontend({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="frontend"
      aria-labelledby="frontend-heading"
      className="bg-surface-muted/50 px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="frontend-heading"
          eyebrow={dict.frontend.eyebrow}
          title={dict.frontend.title}
          description={dict.frontend.description}
        />

        <Reveal stagger className="mt-14 flex flex-wrap gap-x-8 gap-y-6 sm:gap-x-12">
          <IconGrid items={dict.frontendItems} />
        </Reveal>
      </div>
    </section>
  );
}
