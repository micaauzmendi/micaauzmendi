"use client";

import { useEffect, useRef } from "react";

/**
 * A subtle grid of dots that "paints" itself in the warm accent around the
 * cursor. The whole field fades out toward the section's edges/corners so it
 * reads as a loose patch rather than a full bleed. Drop it inside any
 * `position: relative` section; it attaches its pointer listeners to that
 * parent, so no wiring is needed at the call site. Purely decorative and
 * pointer-transparent — it never blocks the content.
 */
export function DotField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = ref.current;
    const host = layer?.parentElement;
    if (!layer || !host) return;

    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      layer.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      layer.style.setProperty("--my", `${event.clientY - rect.top}px`);
      layer.style.setProperty("--reveal", "1");
    };
    const onLeave = () => layer.style.setProperty("--reveal", "0");

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Softly fades the whole field toward the edges/corners.
  const edgeFade = "radial-gradient(115% 100% at 45% 40%, #000 36%, transparent 84%)";
  // Reveals the accent dots only near the cursor.
  const cursor = "radial-gradient(190px circle at var(--mx, -400px) var(--my, -400px), #000 5%, transparent 72%)";

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
      style={{ WebkitMaskImage: edgeFade, maskImage: edgeFade }}
    >
      <div className="bg-dot-field absolute inset-0" />
      <div
        className="bg-dot-field-accent absolute inset-0 transition-opacity duration-300"
        style={{ opacity: "var(--reveal, 0)", WebkitMaskImage: cursor, maskImage: cursor }}
      />
    </div>
  );
}
