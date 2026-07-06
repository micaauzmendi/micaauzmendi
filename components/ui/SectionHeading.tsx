import { DecorativeLine } from "@/components/ui/DecorativeLine";
import { Highlight } from "@/components/ui/Highlight";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  id: string;
  description?: string;
  align?: "left" | "center";
  /**
   * Optional trailing phrase of `title` to emphasize with a soft marker (the
   * "punch" of the line). Must be an exact suffix of `title`; otherwise the
   * title renders plain.
   */
  accent?: string;
}

export function SectionHeading({ eyebrow, title, id, description, align = "left", accent }: SectionHeadingProps) {
  const hasAccent = Boolean(accent) && title.endsWith(accent!);
  const lead = hasAccent ? title.slice(0, title.length - accent!.length).trimEnd() : title;
  const accentDelay = lead.split(" ").length * 0.045;

  return (
    <Reveal className={align === "center" ? "text-center" : "text-left"}>
      <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : "justify-start"}`}>
        <DecorativeLine orientation="vertical" className="h-4" />
        <p className="font-mono font-medium text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      </div>
      <h2 id={id} className="mt-4 max-w-2xl font-heading text-3xl font-medium text-text sm:text-4xl">
        <RevealText>{lead}</RevealText>
        {hasAccent ? (
          <>
            {" "}
            <Highlight tone="soft">
              <RevealText delay={accentDelay}>{accent!}</RevealText>
            </Highlight>
          </>
        ) : null}
      </h2>
      {description ? <p className="mt-4 max-w-xl text-base text-text-secondary">{description}</p> : null}
    </Reveal>
  );
}
