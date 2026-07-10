"use client";

import { useMemo, useState } from "react";
import { ProjectGrid } from "@/components/portfolio/ProjectGrid";
import { cn } from "@/lib/utils";
import type { PortfolioProject, ProjectTag } from "@/types/content";
import type { Dictionary } from "@/types/dictionary";

// Fallback for projects that predate the `tags` field: derive one from category
// so every project still matches at least the discipline chip.
function tagsFor(project: PortfolioProject): ProjectTag[] {
  if (project.tags?.length) return project.tags;
  return project.category === "Brands" ? ["branding"] : ["ux-ui"];
}

export function ProjectIndexList({
  projects,
  dict,
  caseImages,
}: {
  projects: PortfolioProject[];
  dict: Dictionary;
  caseImages?: Record<string, string[]>;
}) {
  const [filter, setFilter] = useState<string>("all");

  // Only show chips that actually match at least one project.
  const filters = useMemo(
    () => dict.portfolioPage.filters.filter((f) => projects.some((p) => tagsFor(p).includes(f.id as ProjectTag))),
    [dict.portfolioPage.filters, projects],
  );

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((project) => tagsFor(project).includes(filter as ProjectTag))),
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
        {filters.map((category) => (
          <button
            key={category.id}
            type="button"
            aria-pressed={filter === category.id}
            onClick={() => setFilter(category.id)}
            className={cn(
              "rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors duration-300",
              filter === category.id
                ? "border-accent bg-accent text-bg"
                : "border-accent-support/50 text-text-secondary hover:border-accent hover:text-accent",
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div key={filter} className="mt-10">
        <ProjectGrid projects={filtered} dict={dict} titleAs="h2" caseImages={caseImages} />
      </div>
    </div>
  );
}
