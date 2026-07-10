import { ArrowUpRight } from "lucide-react";
import { ProjectMarquee } from "@/components/portfolio/ProjectMarquee";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GridField } from "@/components/ui/GridField";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/types/dictionary";

export function FeaturedProjects({
  dict,
  caseImages,
}: {
  dict: Dictionary;
  caseImages?: Record<string, string[]>;
}) {
  const base = dict.locale === "en" ? "/en" : "";
  // Mostramos todos los trabajos: el marquee separa UX/UI (fila superior) de
  // Branding/Textil (fila inferior) para que las filas nunca repitan un proyecto.

  return (
    <section id="proyectos" aria-labelledby="proyectos-heading" className="relative overflow-hidden bg-surface-muted/50 px-6 py-16 md:px-10 md:py-32">
      <GridField />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="proyectos-heading"
          eyebrow={dict.featuredProjects.eyebrow}
          title={dict.featuredProjects.title}
          accent={dict.featuredProjects.titleAccent}
          description={dict.featuredProjects.description}
        />

        <Reveal delay={0.1} className="mt-14">
          <ProjectMarquee projects={dict.projects} dict={dict} caseImages={caseImages} />
        </Reveal>

        <Reveal delay={0.15} className="mt-14 flex justify-center">
          <Button href={`${base}/proyectos`} variant="outline" className="uppercase">
            {dict.featuredProjectsUi.viewAll}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
