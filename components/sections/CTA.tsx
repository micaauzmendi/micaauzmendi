"use client";

import { Download, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DecorativeLine } from "@/components/ui/DecorativeLine";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { ContactModal } from "@/components/sections/ContactModal";
import type { Dictionary } from "@/types/dictionary";

export function CTA({ dict }: { dict: Dictionary }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      id="contacto"
      aria-labelledby="contacto-heading"
      className="relative overflow-hidden bg-surface-muted/50 px-6 py-24 md:px-10 md:py-32"
    >
      <div
        aria-hidden="true"
        className="bg-glow-warm absolute left-1/2 top-0 -z-10 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 opacity-10 blur-3xl"
      />

      <div className="mx-auto max-w-xl text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-3">
            <DecorativeLine orientation="vertical" className="h-4" />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{dict.cta.eyebrow}</p>
          </div>
          <h2 id="contacto-heading" className="mt-4 font-heading text-3xl font-semibold text-text sm:text-4xl">
            <RevealText>{dict.cta.headlinePre}</RevealText>{" "}
            <RevealText className="text-accent" delay={dict.cta.headlinePre.split(" ").length * 0.045}>
              {dict.cta.headlineAccent}
            </RevealText>{" "}
            <RevealText
              delay={(dict.cta.headlinePre.split(" ").length + dict.cta.headlineAccent.split(" ").length) * 0.045}
            >
              {dict.cta.headlinePost}
            </RevealText>
          </h2>
          <p className="mt-4 text-base text-text-secondary">{dict.cta.responsePromise}</p>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button variant="primary" onClick={() => setModalOpen(true)} className="uppercase">
            <MessageCircle size={16} aria-hidden="true" />
            {dict.cta.emailButton}
          </Button>
          <Button href="/cv-mica-auzmendi.pdf" variant="outline" download className="uppercase">
            <Download size={14} aria-hidden="true" />
            {dict.cta.downloadCvButton}
          </Button>
        </Reveal>
      </div>

      <ContactModal dict={dict} open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
