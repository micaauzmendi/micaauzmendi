"use client";

import { useRevealField } from "@/lib/useRevealField";

/**
 * A notebook grid ("cuadrillé") — the sketchbook the whole portfolio riffs on:
 * the blank ruled page where an idea gets drawn. It sits as a plain square grid
 * of faint lines, fades out toward the section's edges so it never fills the
 * whole block, and on hover "paints" accent "+" ticks at the intersections
 * around the cursor. Drop it inside any `position: relative` section; it wires
 * its pointer listeners to that parent. Decorative and pointer-transparent. On
 * touch devices the reveal drifts on its own (see useRevealField).
 */
export function GridField({ className = "" }: { className?: string }) {
  const ref = useRevealField<HTMLDivElement>();

  // Softly fades the whole grid toward the edges/corners so it reads as a loose
  // patch of ruled paper rather than a full bleed.
  const edgeFade = "radial-gradient(90% 92% at 50% 46%, #000 24%, transparent 80%)";
  // Reveals the blue "sketch" pass (lines + "+" ticks) only near the cursor.
  const cursor = "radial-gradient(175px circle at var(--mx, -400px) var(--my, -400px), #000 8%, transparent 72%)";

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
      style={{ WebkitMaskImage: edgeFade, maskImage: edgeFade }}
    >
      <div className="bg-grid-paper absolute inset-0" />
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ opacity: "var(--reveal, 0)", WebkitMaskImage: cursor, maskImage: cursor }}
      >
        <div className="bg-grid-hover-lines absolute inset-0" />
        <div className="bg-grid-cross-accent absolute inset-0" />
      </div>
    </div>
  );
}
