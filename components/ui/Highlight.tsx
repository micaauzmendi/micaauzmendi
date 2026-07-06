import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Highlighter-style emphasis. Instead of a solid box, a translucent marker band
 * sweeps across the lower part of the word — like a real highlighter stroke —
 * letting the text read naturally on top. box-decoration-clone keeps the swipe
 * intact across line wraps; the color comes from the accent-support token, so it
 * adapts between themes.
 */
const markerStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(to top, color-mix(in srgb, var(--color-accent-support) 78%, transparent) 0%, color-mix(in srgb, var(--color-accent-support) 78%, transparent) 40%, transparent 48%)",
  backgroundRepeat: "no-repeat",
};

/**
 * A far lighter wash of the same marker, for emphasis that should whisper rather
 * than shout — used on section titles so they get the header's editorial accent
 * without competing with the hero. Low-opacity band, and the text keeps its
 * normal color (no accent tint).
 */
const softMarkerStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(to top, color-mix(in srgb, var(--color-accent-support) 30%, transparent) 0%, color-mix(in srgb, var(--color-accent-support) 30%, transparent) 46%, transparent 54%)",
  backgroundRepeat: "no-repeat",
};

export function Highlight({
  children,
  className,
  tone = "strong",
}: {
  children: ReactNode;
  className?: string;
  tone?: "strong" | "soft";
}) {
  return (
    <mark
      style={tone === "soft" ? softMarkerStyle : markerStyle}
      className={cn(
        "box-decoration-clone bg-transparent px-[0.08em]",
        tone === "strong" && "text-accent",
        className,
      )}
    >
      {children}
    </mark>
  );
}
