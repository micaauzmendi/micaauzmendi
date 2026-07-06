import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionIconTile } from "@/components/ui/MotionIconTile";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import type { Dictionary } from "@/types/dictionary";

export function Process({ dict }: { dict: Dictionary }) {
  return (
    <section id="proceso" aria-labelledby="proceso-heading" className="bg-surface-muted/50 px-6 py-16 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="proceso-heading"
          eyebrow={dict.process.eyebrow}
          title={dict.process.title}
          accent={dict.process.titleAccent}
          description={dict.process.description}
        />

        <Reveal stagger className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:mt-16 md:gap-y-14 lg:grid-cols-3">
          {dict.processSteps.map((item, index) => {
            return (
              <RevealItem key={item.step} variant="blurIn" className="group">
                <MotionIconTile icon={item.icon} index={index} />
                <p className="mt-4 font-mono text-xs text-accent-support transition-colors duration-300 group-hover:text-accent">{item.step}</p>
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
