"use client";

import { useEffect, useRef } from "react";

/**
 * Drives the cursor-follow reveal used by DotField / GridField: it writes the
 * mask position (`--mx`/`--my`) and opacity (`--reveal`) onto the returned
 * layer element.
 *
 * - On hover-capable devices (desktop with a mouse) it tracks the real pointer,
 *   exactly as before: the accent dots/grid paint in around the cursor.
 * - On touch / no-hover devices (mobile) there is no pointer to follow, so it
 *   instead drifts a "phantom cursor" across the field on a slow loop — the same
 *   reveal effect, playing by itself. The loop only runs while the field is on
 *   screen (an IntersectionObserver pauses it otherwise) so a long mobile page
 *   isn't animating every field at once, and it's disabled under reduced motion.
 *
 * Attach the returned ref to the mask layer; its parent element is treated as
 * the field's bounds, matching the existing call sites.
 */
export function useRevealField<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const layer = ref.current;
    const host = layer?.parentElement;
    if (!layer || !host) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (canHover) {
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
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const elapsed = (t - start) / 1000;
      const rect = host.getBoundingClientRect();
      // Two slow, out-of-phase sines trace a Lissajous drift, so the phantom
      // cursor wanders organically instead of looping on an obvious path.
      const x = (0.5 + 0.42 * Math.sin(elapsed * 0.55)) * rect.width;
      const y = (0.5 + 0.42 * Math.sin(elapsed * 0.37 + 1.3)) * rect.height;
      layer.style.setProperty("--mx", `${x}px`);
      layer.style.setProperty("--my", `${y}px`);
      layer.style.setProperty("--reveal", "1");
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!raf) raf = requestAnimationFrame(tick);
        } else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
          start = null;
          layer.style.setProperty("--reveal", "0");
        }
      },
      { threshold: 0 },
    );
    io.observe(host);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}
