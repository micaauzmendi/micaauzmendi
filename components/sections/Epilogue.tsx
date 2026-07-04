"use client";

import { Eye } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ContactModal } from "@/components/sections/ContactModal";
import { CvModal } from "@/components/sections/CvModal";
import { Button } from "@/components/ui/Button";
import { DotGrid } from "@/components/ui/DotGrid";
import { Highlight } from "@/components/ui/Highlight";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import type { Dictionary } from "@/types/dictionary";

const EPILOGUE_PHOTO = "/photos/retrato-principal.png";

/**
 * The human close. The portrait returns and the greeting finally happens. The
 * primary door is to talk, with the CV and the full body of work as quieter,
 * secondary exits.
 */
export function Epilogue({ dict }: { dict: Dictionary }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const { kicker, now, greeting, body, cta } = dict.book.epilogue;
  const base = dict.locale === "en" ? "/en" : "";

  return (
    <section
      id="contacto"
      aria-labelledby="epilogo-heading"
      className="relative overflow-hidden bg-surface-muted/40 px-6 py-28 md:px-10 md:py-36"
    >
      <div
        aria-hidden="true"
        className="bg-glow-warm pointer-events-none absolute right-0 top-0 -z-10 h-[360px] w-[360px] translate-x-1/3 -translate-y-1/4 opacity-10 blur-3xl"
      />

      <div className="mx-auto grid max-w-5xl items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal variant="blurIn" className="relative mx-auto w-full max-w-xs lg:mx-0">
          <DotGrid rows={6} cols={6} className="absolute -left-5 -top-5 hidden opacity-60 md:grid" />
          <span aria-hidden="true" className="absolute -right-3 -top-3 z-10 h-10 w-10 border-r-2 border-t-2 border-accent" />
          <span aria-hidden="true" className="absolute -bottom-3 -left-3 z-10 h-10 w-10 border-b-2 border-l-2 border-accent" />
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={EPILOGUE_PHOTO}
              alt={dict.personalInfo.name}
              fill
              sizes="(min-width: 1024px) 30vw, 80vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div>
          <p className="font-mono font-medium text-xs uppercase tracking-[0.3em] text-accent">{kicker}</p>
          <h2 id="epilogo-heading" className="mt-5 font-heading text-4xl font-medium leading-tight text-text sm:text-5xl">
            <span className="block text-text-secondary">{now}</span>
            <Highlight>
              <RevealText className="text-accent">{greeting}</RevealText>
            </Highlight>
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary text-pretty">{body}</p>

          <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center gap-3">
            <Button variant="primary" onClick={() => setModalOpen(true)} className="uppercase">
              {cta}
            </Button>
            <Button variant="outline" onClick={() => setCvOpen(true)} className="uppercase">
              <Eye size={14} aria-hidden="true" />
              {dict.cta.viewCvButton}
            </Button>
            <Button href={`${base}/proyectos`} variant="outline" className="uppercase">
              {dict.hero.ctaProjects}
            </Button>
          </Reveal>
        </div>
      </div>

      <ContactModal dict={dict} open={modalOpen} onClose={() => setModalOpen(false)} />
      <CvModal dict={dict} open={cvOpen} onClose={() => setCvOpen(false)} />
    </section>
  );
}
