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

export function Highlight({
  children,
  className,
  tone = "strong",
}: {
  children: ReactNode;
  className?: string;
  tone?: "strong" | "soft";
}) {
  // Soft: a far lighter wash for section titles (whispers rather than shouts).
  // The band lives in CSS (.hl-soft) so it can flip to a light, contrasting
  // color in dark mode; the text stays dark ink in both modes.
  if (tone === "soft") {
    return (
      <mark className={cn("hl-soft box-decoration-clone bg-transparent px-[0.08em] text-text", className)}>
        {children}
      </mark>
    );
  }

  return (
    <mark
      style={markerStyle}
      className={cn("box-decoration-clone bg-transparent px-[0.08em] text-accent", className)}
    >
      {children}
    </mark>
  );
}
