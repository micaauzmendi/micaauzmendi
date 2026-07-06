import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import type { Dictionary } from "@/types/dictionary";

export function Skills({ dict }: { dict: Dictionary }) {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="bg-surface-muted/50 px-6 py-16 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="skills-heading"
          eyebrow={dict.skills.eyebrow}
          title={dict.skills.title}
          accent={dict.skills.titleAccent}
        />

        <Reveal stagger className="mt-16 grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-3">
          {dict.skillsItems.map((group, index) => (
            <RevealItem key={group.category} className="border-t border-accent-support/30 pt-6">
              <p className="font-mono font-medium text-xs uppercase tracking-[0.2em] text-accent">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-heading text-xl font-medium text-text">{group.category}</h3>
              {group.summary ? (
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{group.summary}</p>
              ) : null}
              <div className="mt-5 flex flex-wrap gap-2">
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
