import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionIconTile } from "@/components/ui/MotionIconTile";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import type { Dictionary } from "@/types/dictionary";

export function Process({ dict }: { dict: Dictionary }) {
  return (
    <section id="proceso" aria-labelledby="proceso-heading" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="proceso-heading"
          eyebrow={dict.process.eyebrow}
          title={dict.process.title}
          description={dict.process.description}
        />

        <Reveal stagger className="mt-16 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-5">
          {dict.processSteps.map((item, index) => {
            return (
              <RevealItem key={item.step} variant="blurIn" className="group">
                <MotionIconTile icon={item.icon} index={index} />
                <p className="mt-5 font-mono text-xs text-accent-support transition-colors duration-300 group-hover:text-accent">{item.step}</p>
                <h3 className="mt-2 font-heading text-lg font-medium text-text">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.description}</p>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
