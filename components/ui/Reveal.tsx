"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { revealVariants, staggerContainer, type RevealVariant } from "@/lib/motion/variants";

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  as?: ElementType;
  className?: string;
  stagger?: boolean;
  once?: boolean;
}

export function Reveal({
  children,
  variant = "fadeUp",
  delay = 0,
  as: Tag = "div",
  className,
  stagger = false,
  once = true,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[Tag as "div"] ?? motion.div;
  const variants = prefersReducedMotion ? revealVariants.none : stagger ? staggerContainer : revealVariants[variant];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={variants}
      transition={prefersReducedMotion ? { duration: 0 } : { delay }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  variant = "fadeUp",
  className,
}: {
  children: ReactNode;
  variant?: RevealVariant;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? revealVariants.none : revealVariants[variant];

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
