import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { buildEditorialLayout, SIZE_SPAN } from "@/lib/editorialGrid";
import { formatTemplate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { PortfolioProject } from "@/types/content";
import type { Dictionary } from "@/types/dictionary";

interface ProjectGridProps {
  projects: PortfolioProject[];
  dict: Dictionary;
  titleAs?: "h2" | "h3";
}

export function ProjectGrid({ projects, dict, titleAs = "h3" }: ProjectGridProps) {
  const sizes = buildEditorialLayout(projects.length);
  const TitleTag = titleAs;

  return (
    <Reveal
      stagger
      className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[13rem] lg:[grid-auto-flow:dense] xl:auto-rows-[15rem]"
    >
      {projects.map((project, index) => (
        <RevealItem key={project.id} className={cn("group flex flex-col", SIZE_SPAN[sizes[index]])}>
          <a
            href={project.behanceUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={formatTemplate(dict.featuredProjectsUi.caseStudyLabel, { title: project.title })}
            className="flex h-full w-full flex-col"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-none transition-[border-radius] duration-500 ease-out group-hover:rounded-tl-[2rem] group-hover:rounded-br-[2rem] lg:aspect-auto lg:min-h-0 lg:flex-1">
              <Image
                src={project.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover grayscale transition-[filter,transform] duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
              />
            </div>
            <div className="mt-3 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <TitleTag className="truncate font-heading text-lg font-medium text-text transition-colors group-hover:text-accent">
                  {project.title}
                </TitleTag>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-text-muted">
                  {project.category}
                  {project.year ? ` · ${project.year}` : ""}
                </p>
              </div>
              <ArrowUpRight
                size={18}
                aria-hidden="true"
                className="mt-1 shrink-0 text-text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              />
            </div>
          </a>
        </RevealItem>
      ))}
    </Reveal>
  );
}
