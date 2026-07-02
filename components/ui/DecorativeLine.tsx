"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DecorativeLineProps {
  orientation?: "horizontal" | "vertical" | "plus";
  className?: string;
  /** Adds a very subtle traveling point along the line. Only worth it on longer lines. */
  animated?: boolean;
}

export function DecorativeLine({ orientation = "horizontal", className, animated = false }: DecorativeLineProps) {
  const prefersReducedMotion = useReducedMotion();

  if (orientation === "plus") {
    return (
      <span aria-hidden="true" className={cn("relative block h-6 w-6 text-accent-support", className)}>
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
      </span>
    );
  }

  const showDot = animated && !prefersReducedMotion;

  return (
    <span
      aria-hidden="true"
      className={cn("relative block", orientation === "vertical" ? "w-px" : "h-px w-full", "bg-accent-support/60", className)}
    >
      {showDot ? (
        <motion.span
          className={cn(
            "absolute rounded-full bg-accent",
            orientation === "vertical" ? "left-1/2 h-1 w-1 -translate-x-1/2" : "top-1/2 h-1 w-1 -translate-y-1/2",
          )}
          animate={orientation === "vertical" ? { top: ["0%", "100%", "0%"] } : { left: ["0%", "100%", "0%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
    </span>
  );
}
