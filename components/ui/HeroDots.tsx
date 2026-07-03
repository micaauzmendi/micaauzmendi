"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

const COUNT = 60;

/** Deterministic PRNG so the server and client render identical positions (no hydration mismatch). */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A scattered, very subtle dot field — like the dotted texture of a sketch canvas. */
export function HeroDots() {
  const prefersReducedMotion = useReducedMotion();

  const dots = useMemo(() => {
    const rand = mulberry32(20240921);
    return Array.from({ length: COUNT }, () => {
      const base = 0.08 + rand() * 0.16; // 0.08–0.24
      return {
        left: rand() * 100,
        top: rand() * 100,
        size: 2 + rand() * 2, // 2–4px
        base,
        peak: base + 0.16,
        duration: 3.5 + rand() * 3.5, // 3.5–7s
        delay: rand() * 5,
      };
    });
  }, []);

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-sm" aria-hidden="true">
      <div className="bg-glow-warm absolute inset-0 -z-10 opacity-20 blur-3xl" />
      {dots.map((dot, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-accent-support"
          style={{ left: `${dot.left}%`, top: `${dot.top}%`, width: dot.size, height: dot.size, opacity: dot.base }}
          animate={prefersReducedMotion ? undefined : { opacity: [dot.base, dot.peak, dot.base] }}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: dot.duration, repeat: Infinity, ease: "easeInOut", delay: dot.delay }
          }
        />
      ))}
    </div>
  );
}
