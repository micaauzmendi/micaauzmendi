import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Highlighter-style emphasis — wraps a word or phrase in a light-accent "marker
 * swipe" (accent-support) with dark-accent ink (accent) on top. Uses the
 * semantic <mark> element; em-based padding/radius scale with the surrounding
 * type size and box-decoration-clone keeps the swipe intact across line wraps.
 * Colors come from the accent tokens, so it flips sensibly between themes.
 */
export function Highlight({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <mark
      className={cn(
        "box-decoration-clone rounded-[0.16em] bg-accent-support/80 px-[0.28em] py-[0.04em] text-accent",
        className,
      )}
    >
      {children}
    </mark>
  );
}
