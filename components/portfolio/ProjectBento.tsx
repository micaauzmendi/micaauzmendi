import Image from "next/image";
import { formatTemplate } from "@/lib/format";
import type { PortfolioProject } from "@/types/content";
import type { Dictionary } from "@/types/dictionary";

// Ritmo de anchos variable sobre una grilla de 6 columnas (desde md). Se repite
// para cualquier cantidad de proyectos: cada par de piezas suma 6 columnas, así
// las filas quedan parejas mientras algunas piezas resultan más anchas que otras.
const SPAN = [
  "md:col-span-4",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-4",
  "md:col-span-3",
  "md:col-span-3",
  "md:col-span-4",
  "md:col-span-2",
];

function sizesFor(span: string) {
  if (span.includes("span-4")) return "(max-width: 768px) 100vw, (max-width: 1152px) 66vw, 760px";
  if (span.includes("span-3")) return "(max-width: 768px) 100vw, 50vw";
  return "(max-width: 768px) 100vw, 33vw";
}

export function ProjectBento({ projects, dict }: { projects: PortfolioProject[]; dict: Dictionary }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
      {projects.map((project, i) => {
        const span = SPAN[i % SPAN.length];
        return (
          <a
            key={project.id}
            href={project.behanceUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={formatTemplate(dict.featuredProjectsUi.caseStudyLabel, { title: project.title })}
            className={`group relative block h-56 overflow-hidden rounded-none transition-[border-radius] duration-500 ease-out hover:rounded-tl-[2rem] hover:rounded-br-[2rem] md:h-72 lg:h-80 ${span}`}
          >
            <Image
              src={project.image}
              alt=""
              fill
              quality={90}
              sizes={sizesFor(span)}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-text/80 via-text/0 to-text/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-bg opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <p className="font-heading text-base font-medium">{project.title}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-bg/80">
                {project.label ?? project.category}
                {project.year ? ` · ${project.year}` : ""}
              </p>
            </div>
          </a>
        );
      })}
    </div>
  );
}
