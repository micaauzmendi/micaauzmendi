"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const SRC = "/photos/camara.png";

/** Warm duotone at rest, revealed to full color on hover; grain + soft edge blend. */
function TreatedImage() {
  return (
    <>
      <Image
        src={SRC}
        alt=""
        fill
        sizes="(min-width: 1280px) 42vw, (min-width: 1024px) 46vw, 100vw"
        className="scale-110 object-cover object-center grayscale transition-[filter] duration-700 ease-out group-hover:grayscale-0"
        priority
      />
      {/* Warm accent wash — fades out on hover to reveal the true photo */}
      <div className="absolute inset-0 bg-accent opacity-40 mix-blend-color transition-opacity duration-700 ease-out group-hover:opacity-0" />
      {/* Deepen shadows toward the warm dark */}
      <div className="absolute inset-0 bg-gradient-to-t from-text/25 via-transparent to-transparent" />
    </>
  );
}

export function HeroPortrait({ caption, variant }: { caption: string; variant: "bleed" | "inline" }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const interactive = variant === "bleed";

  const { scrollYProgress } = useScroll({ target: panelRef, offset: ["start start", "end start"] });
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 80]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springConfig = { stiffness: 120, damping: 20, mass: 0.4 };
  const sx = useSpring(mx, springConfig);
  const sy = useSpring(my, springConfig);
  const imgX = useTransform(sx, [-1, 1], [prefersReducedMotion ? 0 : -16, prefersReducedMotion ? 0 : 16]);
  const imgY = useTransform(sy, [-1, 1], [prefersReducedMotion ? 0 : -16, prefersReducedMotion ? 0 : 16]);

  const panelClass =
    variant === "bleed"
      ? "absolute inset-y-0 right-0 z-0 hidden w-[46%] lg:block xl:w-[42%]"
      : "relative mt-12 aspect-[4/5] w-full lg:hidden";

  return (
    <motion.div
      ref={panelRef}
      aria-hidden="true"
      style={interactive ? { y: scrollY } : undefined}
      onMouseMove={
        interactive
          ? (event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              mx.set((event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2));
              my.set((event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2));
            }
          : undefined
      }
      onMouseLeave={
        interactive
          ? () => {
              mx.set(0);
              my.set(0);
            }
          : undefined
      }
      initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
      animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className={panelClass}
    >
      <div className="group relative h-full w-full overflow-hidden">
        <motion.div style={interactive ? { x: imgX, y: imgY } : undefined} className="absolute inset-0">
          <TreatedImage />
        </motion.div>
        {/* Grain texture */}
        <div className="bg-grain pointer-events-none absolute inset-0" />
        {/* Blend the inner edge into the page so text stays legible where they meet */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-bg/60 to-transparent" />
        <span className="pointer-events-none absolute bottom-8 left-5 origin-bottom-left -rotate-90 font-mono text-[10px] uppercase tracking-[0.35em] text-bg/70">
          {caption}
        </span>
      </div>
    </motion.div>
  );
}
