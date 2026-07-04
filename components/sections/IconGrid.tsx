import { RevealItem } from "@/components/ui/Reveal";
import { iconMap } from "@/lib/icons";
import type { IconItem } from "@/types/content";

/**
 * A flat, typographic list of tools/tech — no cards. Each item is just its icon
 * and name; on hover the icon lifts and an accent underline draws in, so the
 * row reads like a modern index rather than a grid of boxes.
 */
export function IconGrid({ items }: { items: IconItem[] }) {
  return (
    <>
      {items.map(({ name, icon }) => {
        const Icon = iconMap[icon];
        return (
          <RevealItem key={name}>
            <div className="group flex items-center gap-2.5">
              <Icon
                aria-hidden="true"
                size={18}
                className="shrink-0 text-accent transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
              />
              <span className="relative font-mono text-sm text-text-secondary transition-colors duration-300 group-hover:text-text after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100">
                {name}
              </span>
            </div>
          </RevealItem>
        );
      })}
    </>
  );
}
