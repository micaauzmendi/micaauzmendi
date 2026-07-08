import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { iconMap } from "@/lib/icons";
import type { Dictionary } from "@/types/dictionary";

export function Services({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="servicios"
      aria-labelledby="servicios-heading"
      className="relative overflow-hidden bg-surface-muted/50 px-6 py-16 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="servicios-heading"
          eyebrow={dict.services.eyebrow}
          title={dict.services.title}
          accent={dict.services.titleAccent}
          description={dict.services.description}
        />

        <Reveal stagger className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2">
          {dict.servicesItems.map((group) => {
            const Icon = iconMap[group.icon];
            return (
              <RevealItem key={group.category} className="border-t border-accent-support/30 pt-6">
                <div className="flex items-center gap-3">
                  <Icon size={20} aria-hidden="true" className="text-accent" />
                  <h3 className="font-heading text-lg font-medium text-text">{group.category}</h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
