"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Eye } from "lucide-react";
import { useRef, useState } from "react";
import { CvModal } from "@/components/sections/CvModal";
import { Button } from "@/components/ui/Button";
import { DecorativeLine } from "@/components/ui/DecorativeLine";
import { DotField } from "@/components/ui/DotField";
import { Highlight } from "@/components/ui/Highlight";
import { RevealText } from "@/components/ui/RevealText";
import type { Dictionary } from "@/types/dictionary";

/**
 * The opening. Typographic and direct: who she is, one line of intent, and the
 * two things a recruiter wants first — see the work or open the CV.
 */
export function Hero({ dict }: { dict: Dictionary }) {
  const ref = useRef<HTMLElement>(null);
  const [cvOpen, setCvOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 70]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const hero = dict.hero;
  const base = dict.locale === "en" ? "/en" : "";

  return (
    <section
      id="hero"
      ref={ref}
      aria-label={hero.sectionLabel}
      className="relative flex min-h-[72vh] flex-col justify-center overflow-hidden px-6 py-20 md:px-10"
    >
      <DotField />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto w-full max-w-4xl">
        {/* Kept well clear of the text, out in the left margin, so the words stay the protagonist. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-14 top-1/2 hidden h-48 -translate-y-1/2 lg:block"
        >
          <DecorativeLine orientation="vertical" className="h-full" animated />
        </span>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex items-center gap-3 font-mono font-medium text-xs uppercase tracking-[0.35em] text-accent"
        >
          <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
          {hero.sectionLabel}
        </motion.p>

        <h1 className="font-heading text-4xl font-medium leading-[1.12] text-text text-balance sm:text-5xl lg:text-6xl">
          <RevealText>{hero.headlinePre}</RevealText>
          <br />
          <Highlight>
            <RevealText className="text-accent" delay={hero.headlinePre.split(" ").length * 0.045}>
              {hero.headlineAccent}
            </RevealText>
          </Highlight>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
          className="mt-10 max-w-xl text-lg leading-relaxed text-text-secondary text-pretty"
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Button href={`${base}/#proyectos`} variant="primary" className="uppercase">
            {hero.ctaProjects}
          </Button>
          <Button variant="outline" onClick={() => setCvOpen(true)} className="uppercase">
            <Eye size={14} aria-hidden="true" />
            {dict.cta.viewCvButton}
          </Button>
        </motion.div>
      </motion.div>

      <CvModal dict={dict} open={cvOpen} onClose={() => setCvOpen(false)} />
    </section>
  );
}
