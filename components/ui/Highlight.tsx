import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Marker-style highlight behind important words, using the warm palette. */
export function Highlight({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "box-decoration-clone rounded-[3px] bg-accent-support/55 px-1.5 py-0.5 text-text dark:bg-accent/35",
        className,
      )}
    >
      {children}
    </span>
  );
}
