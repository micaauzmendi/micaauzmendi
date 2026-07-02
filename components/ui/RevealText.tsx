"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType } from "react";

interface RevealTextProps {
  children: string;
  as?: ElementType;
  className?: string;
  delay?: number;
}

const word: Variants = {
  hidden: { opacity: 0, y: "0.4em", filter: "blur(6px)" },
  visible: { opacity: 1, y: "0em", filter: "blur(0px)" },
};

/** Scroll-triggered word-by-word reveal. Renders once per mount, falls back to plain text when reduced motion is preferred. */
export function RevealText({ children, as: Tag = "span", className, delay = 0 }: RevealTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = children.split(" ");

  if (prefersReducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ staggerChildren: 0.045, delayChildren: delay }}
        style={{ display: "inline" }}
      >
        {words.map((w, i) => (
          <motion.span
            key={`${w}-${i}`}
            variants={word}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "inline-block", whiteSpace: i < words.length - 1 ? "pre" : "normal" }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
