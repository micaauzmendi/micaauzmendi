import { Card } from "@/components/ui/Card";
import { RevealItem } from "@/components/ui/Reveal";
import { iconMap } from "@/lib/icons";
import type { IconItem } from "@/types/content";

export function IconGrid({ items }: { items: IconItem[] }) {
  return (
    <>
      {items.map(({ name, icon }) => {
        const Icon = iconMap[icon];
        return (
          <RevealItem key={name}>
            <Card as="div" className="flex h-full flex-col items-center gap-3 text-center">
              <Icon aria-hidden="true" size={22} className="text-accent" />
              <p className="text-sm text-text-secondary">{name}</p>
            </Card>
          </RevealItem>
        );
      })}
    </>
  );
}
