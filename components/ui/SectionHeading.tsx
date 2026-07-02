import { DecorativeLine } from "@/components/ui/DecorativeLine";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  id: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, id, description, align = "left" }: SectionHeadingProps) {
  return (
    <Reveal className={align === "center" ? "text-center" : "text-left"}>
      <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : "justify-start"}`}>
        <DecorativeLine orientation="vertical" className="h-4" />
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      </div>
      <h2 id={id} className="mt-4 max-w-2xl font-heading text-3xl font-semibold text-text sm:text-4xl">
        <RevealText>{title}</RevealText>
      </h2>
      {description ? <p className="mt-4 max-w-xl text-base text-text-secondary">{description}</p> : null}
    </Reveal>
  );
}
