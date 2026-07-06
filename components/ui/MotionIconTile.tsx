"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { iconMap } from "@/lib/icons";
import type { IconName } from "@/types/content";

/**
 * The springy entrance for the accent icon "tile". It's defined as a variant
 * (hidden/visible) with NO observer of its own, so it inherits the reveal
 * trigger from the parent stagger container (Reveal → RevealItem). This is what
 * makes it fire reliably on mobile: earlier it ran an independent whileInView
 * that could silently fail to fire on touch, leaving the icon stuck invisible.
 */
const tileVariants: Variants = {
  hidden: { scale: 0.4, rotate: -12, opacity: 0 },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 240, damping: 15 },
  },
};

/**
 * The accent icon "tile" used by the belief/step cards. It layers three kinds of
 * motion so the sections never feel static: a springy pop as its card scrolls
 * into view, a gentle continuous float at rest (staggered per index so they bob
 * out of sync), and a playful tilt on card hover (desktop only). All motion is
 * disabled when the user prefers reduced motion.
 */
export function MotionIconTile({ icon, index }: { icon: IconName; index: number }) {
  const reduce = useReducedMotion();
  const Icon = iconMap[icon];

  return (
    <motion.div className="inline-block" variants={reduce ? undefined : tileVariants}>
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
