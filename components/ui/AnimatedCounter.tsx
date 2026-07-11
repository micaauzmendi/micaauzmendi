"use client";

import { motion, useInView, useMotionValue, useReducedMotion, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  label: string;
  /** Tailwind classes applied to the big number, e.g. to change its color/size. */
  valueClassName?: string;
}

export function AnimatedCounter({ value, suffix = "", label, valueClassName = "text-text" }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const count = useMotionValue(prefersReducedMotion ? value : 0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;
    const controls = animate(count, value, { duration: 1.4, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [isInView, value, count, prefersReducedMotion]);

  return (
    <div ref={ref} className="flex min-w-0 flex-col gap-1">
      {/* Tamaño fluido atado al ANCHO DEL CONTENEDOR (unidad cqi), no del viewport:
          así escala con el contenedor de stats (que topa en max-w-4xl) y nunca
          desborda, incluso cuando el viewport es más ancho que el contenedor.
          Requiere un ancestro con `@container` (ver About). */}
      <p className={`font-heading text-5xl sm:text-[clamp(1.75rem,6cqi,3.75rem)] font-bold leading-none tabular-nums ${valueClassName}`}>
        <motion.span>{rounded}</motion.span>
        {suffix}
      </p>
      <p className="max-w-[16ch] text-sm text-text-secondary">{label}</p>
    </div>
  );
}
