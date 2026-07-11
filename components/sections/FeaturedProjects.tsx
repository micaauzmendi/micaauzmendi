import { ProjectIndexList } from "@/components/portfolio/ProjectIndexList";
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
  // Trabajos ahora vive sólo aquí (la página /proyectos está oculta). Mostramos
  // la grilla editorial irregular con filtros — cada pieza abre su vista previa
  // in-site, igual que antes hacía la sección /proyectos.

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
          <ProjectIndexList projects={dict.projects} dict={dict} caseImages={caseImages} />
        </Reveal>
      </div>
    </section>
  );
}
