import { GridField } from "@/components/ui/GridField";
import { Highlight } from "@/components/ui/Highlight";
import { RevealText } from "@/components/ui/RevealText";
import type { Dictionary } from "@/types/dictionary";

/**
 * A quiet, full-width beat between the work and the story behind it. No buttons,
 * no navigation — one thought. The conceptual heart of the portfolio.
 */
export function Interlude({ dict }: { dict: Dictionary }) {
  const { kicker, phrasePre, phraseAccent, phrasePost } = dict.interlude;

  return (
    <section
      aria-label={kicker}
      className="relative flex min-h-0 items-center justify-center overflow-hidden bg-surface-muted/50 px-6 py-16 md:min-h-[45vh] md:px-10 md:py-24"
    >
      <GridField />
      <div
        aria-hidden="true"
        className="bg-glow-warm pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 opacity-[0.07] blur-3xl"
      />
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-heading text-3xl font-medium leading-[1.3] text-text text-balance sm:text-4xl lg:text-5xl">
          <RevealText>{phrasePre}</RevealText>{" "}
          <Highlight>
            <RevealText className="italic" delay={phrasePre.split(" ").length * 0.06}>
              {phraseAccent}
            </RevealText>
          </Highlight>{" "}
          <RevealText delay={(phrasePre.split(" ").length + phraseAccent.split(" ").length) * 0.06}>
            {phrasePost}
          </RevealText>
        </p>
      </div>
    </section>
  );
}
