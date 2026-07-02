import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import type { Dictionary } from "@/types/dictionary";

export function Skills({ dict }: { dict: Dictionary }) {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="bg-surface-muted/50 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="skills-heading" eyebrow={dict.skills.eyebrow} title={dict.skills.title} />

        <Reveal stagger className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2">
          {dict.skillsItems.map((group) => (
            <RevealItem key={group.category}>
              <h3 className="font-heading text-lg font-semibold text-text">{group.category}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
