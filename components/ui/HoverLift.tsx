"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * The same hover "lift" used by the experience cards: a gentle scale from the
 * left edge. Pair with `group-hover:text-accent` on the item's title so the
 * text warms up as it grows. Keep `group relative z-0 hover:z-10` on the class
 * so the scaled item sits above its neighbours.
 */
export function HoverLift({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.07 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: "left center" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
