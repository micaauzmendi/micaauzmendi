"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { DecorativeLine } from "@/components/ui/DecorativeLine";
import { HeroDots } from "@/components/ui/HeroDots";
import { RevealText } from "@/components/ui/RevealText";
import type { Dictionary } from "@/types/dictionary";

export function Hero({ dict }: { dict: Dictionary }) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const base = dict.locale === "en" ? "/en" : "";

  return (
    <section
      id="hero"
      ref={ref}
      aria-label={dict.hero.sectionLabel}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-28 md:px-10"
    >
      <span aria-hidden="true" className="absolute right-10 top-10 hidden md:block">
        <DecorativeLine orientation="plus" className="h-10 w-10" />
      </span>
      <span aria-hidden="true" className="absolute left-8 top-1/4 hidden h-40 md:block">
        <DecorativeLine orientation="vertical" className="h-40" animated />
      </span>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto grid w-full max-w-6xl gap-16 lg:grid-cols-[1.35fr_0.65fr] lg:items-center lg:gap-12"
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-text-secondary"
          >
            {dict.personalInfo.title}
          </motion.p>

          <h1 className="font-heading text-4xl font-semibold leading-[1.1] text-text text-balance sm:text-5xl lg:text-6xl">
            <RevealText>{dict.hero.headlinePre}</RevealText>{" "}
            <RevealText className="text-accent" delay={dict.hero.headlinePre.split(" ").length * 0.045}>
              {dict.hero.headlineAccent}
            </RevealText>
            {dict.hero.headlinePost ? (
              <>
                {" "}
                <RevealText
                  delay={
                    (dict.hero.headlinePre.split(" ").length + dict.hero.headlineAccent.split(" ").length) * 0.045
                  }
                >
                  {dict.hero.headlinePost}
                </RevealText>
              </>
            ) : null}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            className="mt-8 flex min-w-0 items-center gap-3"
          >
            <DecorativeLine className="w-10 shrink-0" />
            <p className="min-w-0 flex-1 font-mono text-xs uppercase leading-relaxed tracking-[0.15em] text-text-secondary">
              {dict.personalInfo.tagline}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <Button href={`${base}/proyectos`} variant="primary" className="uppercase">
              {dict.hero.ctaProjects}
            </Button>
            <Button href={`${base}/#contacto`} variant="outline" className="uppercase">
              {dict.hero.ctaContact}
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="hidden lg:block"
        >
          <HeroDots />
        </motion.div>
      </motion.div>

      <motion.a
        href={`${base}/#sobre-mi`}
        aria-label={dict.hero.nextSectionLabel}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: prefersReducedMotion ? 0 : [0, 8, 0] }}
        transition={{ opacity: { delay: 0.8, duration: 0.6 }, y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-text-secondary transition-colors hover:text-accent"
      >
        <ChevronDown size={22} />
      </motion.a>
    </section>
  );
}
