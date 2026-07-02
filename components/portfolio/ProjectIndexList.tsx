"use client";

import { useMemo, useState } from "react";
import { ProjectGrid } from "@/components/portfolio/ProjectGrid";
import { cn } from "@/lib/utils";
import type { PortfolioProject, ProjectCategory } from "@/types/content";
import type { Dictionary } from "@/types/dictionary";

const CATEGORY_FILTERS: ProjectCategory[] = ["UX/UI", "Branding", "Branding & UX/UI"];

export function ProjectIndexList({ projects, dict }: { projects: PortfolioProject[]; dict: Dictionary }) {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((project) => project.category === filter)),
    [filter, projects],
  );

  return (
    <div>
      <div role="group" aria-label={dict.portfolioPage.filterGroupLabel} className="flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={filter === "all"}
          onClick={() => setFilter("all")}
          className={cn(
            "rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors duration-300",
            filter === "all"
              ? "border-accent bg-accent text-bg"
              : "border-accent-support/50 text-text-secondary hover:border-accent hover:text-accent",
          )}
        >
          {dict.portfolioPage.filterAllLabel}
        </button>
        {CATEGORY_FILTERS.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
            className={cn(
              "rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors duration-300",
              filter === category
                ? "border-accent bg-accent text-bg"
                : "border-accent-support/50 text-text-secondary hover:border-accent hover:text-accent",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div key={filter} className="mt-10">
        <ProjectGrid projects={filtered} dict={dict} titleAs="h2" />
      </div>
    </div>
  );
}
