"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ProjectPreviewModal } from "@/components/portfolio/ProjectPreviewModal";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { buildEditorialLayout, SIZE_SPAN, type CardSize } from "@/lib/editorialGrid";
import { formatTemplate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { PortfolioProject } from "@/types/content";
import type { Dictionary } from "@/types/dictionary";

interface ProjectGridProps {
  projects: PortfolioProject[];
  dict: Dictionary;
  titleAs?: "h2" | "h3";
  /** Map `{ [projectId]: imagePaths[] }` for the in-site preview. Optional. */
  caseImages?: Record<string, string[]>;
}

// The grid is capped at max-w-6xl (1152px). "wide" tiles span 8/12 columns
// (~768px), md/tall span 4/12 (~384px). Each tile asks the optimizer for a
// source matched to its real footprint instead of a blanket 50vw.
//
// "tall" spans 2 rows: it's a portrait slot holding a landscape cover, so
// object-cover scales the source by its HEIGHT (~2x its column width). It needs
// a far wider source than its 384px column or it looks upscaled/blurry.
const GRID_SIZES: Record<CardSize, string> = {
  wide: "(min-width: 1152px) 768px, (min-width: 768px) 66vw, 100vw",
  md: "(min-width: 1152px) 384px, (min-width: 768px) 33vw, 100vw",
  tall: "(min-width: 1280px) 900px, (min-width: 768px) 70vw, 100vw",
};

export function ProjectGrid({ projects, dict, titleAs = "h3", caseImages = {} }: ProjectGridProps) {
  const sizes = buildEditorialLayout(projects.length);
  const TitleTag = titleAs;
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeProject = projects.find((project) => project.id === activeId) ?? null;
  const activeImages = activeProject ? caseImages[activeProject.id] ?? [] : [];

  return (
    <>
      <Reveal
        stagger
        className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-12 md:auto-rows-[13rem] md:[grid-auto-flow:dense] xl:auto-rows-[15rem]"
      >
        {projects.map((project, index) => {
          const media = (
            <>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-none transition-[border-radius] duration-500 ease-out group-hover:rounded-tl-[2rem] group-hover:rounded-br-[2rem] md:aspect-auto md:min-h-0 md:flex-1">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  quality={90}
                  sizes={GRID_SIZES[sizes[index]]}
                  className="object-cover"
                />
              </div>
              <div className="mt-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <TitleTag className="truncate font-heading text-lg font-medium text-text transition-colors group-hover:text-accent">
                    {project.title}
                  </TitleTag>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-text-muted">
                    {project.label ?? project.category}
                    {project.year ? ` · ${project.year}` : ""}
                  </p>
                </div>
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </div>
            </>
          );

          return (
            <RevealItem key={project.id} className={cn("group flex flex-col", SIZE_SPAN[sizes[index]])}>
              <button
                type="button"
                onClick={() => setActiveId(project.id)}
                aria-label={formatTemplate(dict.featuredProjectsUi.previewLabel, { title: project.title })}
                className="flex h-full w-full flex-col text-left"
              >
                {media}
              </button>
            </RevealItem>
          );
        })}
      </Reveal>

      <ProjectPreviewModal
        project={activeProject}
        images={activeImages}
        dict={dict}
        onClose={() => setActiveId(null)}
      />
    </>
  );
}
