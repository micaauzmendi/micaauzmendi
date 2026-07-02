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
      className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:[grid-auto-flow:dense] lg:auto-rows-[15rem] xl:auto-rows-[17rem]"
    >
      {projects.map((project, index) => (
        <RevealItem
          key={project.id}
          className={cn(
            "group relative overflow-hidden rounded-none transition-[border-radius] duration-500 ease-out hover:rounded-tl-[2rem] hover:rounded-br-[2rem]",
            SIZE_SPAN[sizes[index]],
          )}
        >
          <a
            href={project.behanceUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={formatTemplate(dict.featuredProjectsUi.caseStudyLabel, { title: project.title })}
            className="absolute inset-0"
          >
            <Image
              src={project.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover grayscale transition-[filter,transform] duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-text/80 via-text/0 to-text/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-bg opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div>
                <TitleTag className="font-heading text-lg font-semibold">{project.title}</TitleTag>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-bg/80">
                  {project.category}
                  {project.year ? ` · ${project.year}` : ""}
                </p>
              </div>
              <ArrowUpRight
                size={20}
                aria-hidden="true"
                className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </div>
          </a>
        </RevealItem>
      ))}
    </Reveal>
  );
}
