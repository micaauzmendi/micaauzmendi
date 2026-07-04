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

export function Highlight({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <mark
      style={markerStyle}
      className={cn(
        "box-decoration-clone bg-transparent px-[0.08em] text-accent",
        className,
      )}
    >
      {children}
    </mark>
  );
}
