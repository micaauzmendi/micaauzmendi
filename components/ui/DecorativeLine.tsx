"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface DecorativeLineProps {
  orientation?: "horizontal" | "vertical" | "plus";
  className?: string;
  /** On longer lines, adds a drawn-in stroke with a slow light glint passing along it. */
  animated?: boolean;
}

/** Matches the site's editorial reveal easing. */
const EASE = [0.22, 1, 0.36, 1] as const;

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

  const isVertical = orientation === "vertical";
  const sizeClass = isVertical ? "w-px" : "h-px w-full";

  // Static lines (eyebrow ticks, etc.) stay simple — no motion.
  if (!animated) {
    return <span aria-hidden="true" className={cn("relative block", sizeClass, "bg-accent-support/60", className)} />;
  }

  const dir = isVertical ? "to bottom" : "to right";
  // The stroke softens to nothing at both ends instead of stopping hard.
  const strokeStyle: CSSProperties = {
    backgroundImage: `linear-gradient(${dir}, transparent, var(--color-accent-support) 16%, var(--color-accent-support) 84%, transparent)`,
  };
  const glintStyle: CSSProperties = {
    backgroundImage: `linear-gradient(${dir}, transparent, color-mix(in srgb, var(--color-accent) 85%, transparent), transparent)`,
  };

  return (
    <span aria-hidden="true" className={cn("relative block", sizeClass, className)}>
      {/* The stroke draws itself in on view, like the rest of the reveals. */}
      <motion.span
        className={cn("absolute inset-0", isVertical ? "origin-top" : "origin-left")}
        style={strokeStyle}
        initial={{ opacity: 0, scaleY: isVertical ? 0 : 1, scaleX: isVertical ? 1 : 0 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, scaleX: 1, scaleY: 1 }}
        animate={prefersReducedMotion ? { opacity: 1, scaleX: 1, scaleY: 1 } : undefined}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, ease: EASE }}
      />

      {/* A soft light glint travels the line slowly and occasionally — restrained, not mechanical. */}
      {prefersReducedMotion ? null : (
        <motion.span
          className={cn(
            "absolute",
            isVertical ? "left-1/2 h-10 w-px -translate-x-1/2" : "top-1/2 h-px w-10 -translate-y-1/2",
          )}
          style={glintStyle}
          initial={{ opacity: 0 }}
          animate={{
            [isVertical ? "top" : "left"]: ["-12%", "100%"],
            opacity: [0, 0.85, 0.85, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            repeatDelay: 4,
            ease: [0.4, 0, 0.2, 1],
            times: [0, 0.15, 0.85, 1],
          }}
        />
      )}
    </span>
  );
}
