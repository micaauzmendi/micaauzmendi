"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { DecorativeLine } from "@/components/ui/DecorativeLine";
import { DotField } from "@/components/ui/DotField";
import { RevealText } from "@/components/ui/RevealText";
import type { Dictionary } from "@/types/dictionary";

/**
 * The book's cover. Purely typographic — no photo, no CTAs. It doesn't sell;
 * it opens a question. The portrait is deliberately withheld until the epilogue.
 */
export function Prologue({ dict }: { dict: Dictionary }) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 70]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const prologue = dict.book.prologue;

  return (
    <section
      id="hero"
      ref={ref}
      aria-label={prologue.kicker}
      className="relative flex min-h-[72vh] flex-col justify-center overflow-hidden px-6 py-20 md:px-10"
    >
      <DotField />

      <span aria-hidden="true" className="absolute left-8 top-1/4 hidden h-40 md:block">
        <DecorativeLine orientation="vertical" className="h-40" animated />
      </span>

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto w-full max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex items-center gap-3 font-mono font-medium text-xs uppercase tracking-[0.35em] text-accent"
        >
          <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
          {prologue.kicker}
        </motion.p>

        <h1 className="font-heading text-4xl font-medium leading-[1.12] text-text text-balance sm:text-5xl lg:text-6xl">
          <RevealText>{prologue.headlinePre}</RevealText>
          <br />
          <RevealText className="text-accent" delay={prologue.headlinePre.split(" ").length * 0.045}>
            {prologue.headlineAccent}
          </RevealText>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
          className="mt-10 max-w-xl text-lg leading-relaxed text-text-secondary text-pretty"
        >
          {prologue.subtitle}
        </motion.p>
      </motion.div>
    </section>
  );
}
