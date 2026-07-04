import { DecorativeLine } from "@/components/ui/DecorativeLine";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";

interface ChapterMarkerProps {
  /** Roman numeral, e.g. "I". */
  numeral: string;
  /** Kept for API compatibility; no longer rendered (chapters don't say "Chapter N"). */
  kicker?: string;
  /** Thematic label of the chapter, e.g. "Mi recorrido". */
  label: string;
  title: string;
  id: string;
  description?: string;
  /** Kept for API compatibility; no longer rendered. */
  tags?: string[];
  align?: "left" | "center";
}

/**
 * Editorial chapter heading: an oversized faded numeral (the "page number" of
 * the book), a mono kicker line, the chapter title and an optional intro, with
 * a small crosshair mark in the corner.
 */
export function ChapterMarker({ numeral, label, title, id, description, align = "left" }: ChapterMarkerProps) {
  const isCenter = align === "center";

  return (
    <Reveal className={isCenter ? "relative text-center" : "relative text-left"}>
      <DecorativeLine orientation="plus" className="absolute right-0 top-0 hidden lg:block" />

      <span
        aria-hidden="true"
        className="block font-heading text-[3.25rem] font-semibold leading-none text-accent/20 sm:text-6xl"
      >
        {numeral}
      </span>
      <p className={`mt-3 flex items-center gap-3 ${isCenter ? "justify-center" : "justify-start"}`}>
        <span aria-hidden="true" className="h-px w-6 bg-accent/50" />
        <span className="font-mono font-medium text-xs uppercase tracking-[0.3em] text-accent">{label}</span>
      </p>
      <h2
        id={id}
        className={`mt-5 max-w-2xl font-heading text-3xl font-medium leading-tight text-text sm:text-4xl ${
          isCenter ? "mx-auto" : ""
        }`}
      >
        <RevealText>{title}</RevealText>
      </h2>
      {description ? (
        <p className={`mt-5 max-w-xl text-base leading-relaxed text-text-secondary ${isCenter ? "mx-auto" : ""}`}>
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
