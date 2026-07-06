import { SectionHeading } from "@/components/ui/SectionHeading";
import { DotField } from "@/components/ui/DotField";
import { MotionIconTile } from "@/components/ui/MotionIconTile";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import type { Dictionary } from "@/types/dictionary";

export function Philosophy({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="filosofia"
      aria-labelledby="filosofia-heading"
      className="relative overflow-hidden px-6 py-16 md:px-10 md:py-32"
    >
      <DotField />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="filosofia-heading"
          eyebrow={dict.philosophy.eyebrow}
          title={dict.philosophy.title}
          accent={dict.philosophy.titleAccent}
        />

        <Reveal stagger className="mt-8 grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2 md:mt-16 md:gap-y-14">
          {dict.philosophyItems.map((item, index) => {
            return (
              <RevealItem key={item.title} variant="blurIn" className="group">
                <MotionIconTile icon={item.icon} index={index} />
                <h3 className="mt-4 font-heading text-xl font-medium text-text">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">{item.description}</p>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
