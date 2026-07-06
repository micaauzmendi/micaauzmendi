"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Draws vertical divider rules between a row of columns, but snapped to the
 * page's 40px "cuadrillé" grid so each rule lands exactly on a grid line
 * instead of floating at an arbitrary sub-cell position. It measures the gaps
 * between the elements matching `selector` (siblings within its parent),
 * rounds each gap's center to the nearest grid line, and positions a
 * full-height hairline there. Recomputed on resize; hidden while the columns
 * are stacked (single-column layout), where there are no gaps to divide.
 *
 * Drop it as the first child of a `position: relative` wrapper whose other
 * child is the columns grid. The grid's origin is the viewport left edge
 * (the cuadrillé is full-bleed and phase-locked to x = 0), so snapping the
 * viewport-space center to a multiple of `cell` gives a real grid line.
 */
export function GridSnappedRules({ selector, cell = 40 }: { selector: string; cell?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<number[]>([]);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;

    const compute = () => {
      const cols = Array.from(host.querySelectorAll<HTMLElement>(selector));
      if (cols.length < 2) return setLines([]);

      const first = cols[0].getBoundingClientRect();
      const second = cols[1].getBoundingClientRect();
      // Stacked (single column) → tops differ → no vertical dividers.
      if (Math.abs(second.top - first.top) > 4) return setLines([]);

      const hostLeft = host.getBoundingClientRect().left;
      const xs: number[] = [];
      for (let i = 1; i < cols.length; i++) {
        const prev = cols[i - 1].getBoundingClientRect();
        const cur = cols[i].getBoundingClientRect();
        const gapCenter = (prev.right + cur.left) / 2;
        const snapped = Math.round(gapCenter / cell) * cell; // nearest grid line (viewport space)
        xs.push(snapped - hostLeft);
      }
      setLines(xs);
    };

    compute();
    const observer = new ResizeObserver(compute);
    observer.observe(host);
    window.addEventListener("resize", compute);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [selector, cell]);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0">
      {lines.map((x, i) => (
        <span key={i} className="absolute bottom-0 top-0 w-px bg-accent-support/40" style={{ left: `${x}px` }} />
      ))}
    </div>
  );
}
