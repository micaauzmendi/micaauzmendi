"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/** Slim top strip with rotating design-philosophy phrases (decorative). */
export function TopBar({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (phrases.length <= 1) return;
    const id = setInterval(() => setIndex((prev) => (prev + 1) % phrases.length), 4200);
    return () => clearInterval(id);
  }, [phrases.length]);

  return (
    <div
      aria-hidden="true"
      className="relative z-40 flex h-9 items-center justify-center overflow-hidden bg-accent px-6 text-bg"
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 9 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -9 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="truncate font-mono text-[11px] uppercase tracking-[0.2em]"
        >
          {phrases[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
