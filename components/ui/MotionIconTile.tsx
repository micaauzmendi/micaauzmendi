"use client";

import { motion, useReducedMotion } from "framer-motion";
import { iconMap } from "@/lib/icons";
import type { IconName } from "@/types/content";

/**
 * The accent icon "tile" used by the belief/step cards. It layers three kinds of
 * motion so the sections never feel static: a springy pop as it scrolls into
 * view, a gentle continuous float at rest (staggered per index so they bob out
 * of sync), and a playful tilt on card hover. All motion is disabled when the
 * user prefers reduced motion.
 *
 * Three nested elements keep the transforms from fighting each other: the outer
 * motion element owns the entrance, the middle element owns the float, and the
 * inner tile owns the hover.
 */
export function MotionIconTile({ icon, index }: { icon: IconName; index: number }) {
  const reduce = useReducedMotion();
  const Icon = iconMap[icon];

  return (
    <motion.div
      className="inline-block"
      initial={reduce ? false : { scale: 0.4, rotate: -12, opacity: 0 }}
      whileInView={reduce ? undefined : { scale: 1, rotate: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 240, damping: 15, delay: index * 0.09 }}
    >
      <div className={reduce ? undefined : "animate-float"} style={reduce ? undefined : { animationDelay: `${(index % 4) * 0.7}s` }}>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-[transform,background-color] duration-500 ease-out group-hover:-translate-y-1.5 group-hover:-rotate-6 group-hover:bg-accent/20">
          <Icon
            size={26}
            strokeWidth={1.75}
            aria-hidden="true"
            className="transition-transform duration-500 ease-out group-hover:rotate-6 group-hover:scale-110"
          />
        </div>
      </div>
    </motion.div>
  );
}
