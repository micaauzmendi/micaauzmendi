"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Tag } from "@/components/ui/Tag";
import type { ExperienceEntry } from "@/types/content";
import type { Dictionary } from "@/types/dictionary";

export function ExperienceCard({ entry, ui }: { entry: ExperienceEntry; ui: Dictionary["experienceUi"] }) {
  const [open, setOpen] = useState(false);
  const panelId = `experience-panel-${entry.id}`;

  return (
    <article className="relative pl-10 sm:pl-14">
      <span
        aria-hidden="true"
        className="absolute left-0 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-bg sm:left-0"
      />

      <p className="font-mono text-xs uppercase tracking-wider text-accent">{entry.yearLabel}</p>

      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-heading text-xl font-semibold text-text">{entry.company}</h3>
          <p className="mt-1 text-sm text-text-secondary">{entry.role}</p>
        </div>
        <p className="font-mono text-xs uppercase tracking-wider text-text-muted">{entry.period}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {entry.projects.map((project) => (
          <Tag key={project}>{project}</Tag>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:text-text"
      >
        {open ? ui.seeLess : ui.seeMore}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={14} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="mt-4 space-y-3 border-t border-accent-support/30 pt-4">
              {entry.bullets.map((bullet) => (
                <li key={bullet} className="text-sm leading-relaxed text-text-secondary">
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}
