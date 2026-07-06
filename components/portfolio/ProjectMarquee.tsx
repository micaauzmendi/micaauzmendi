"use client";

import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { ProjectPreviewModal } from "@/components/portfolio/ProjectPreviewModal";
import { formatTemplate } from "@/lib/format";
import type { PortfolioProject } from "@/types/content";
import type { Dictionary } from "@/types/dictionary";

const SPEED_PX_PER_SEC = 32;
const REPEAT = 3;
const DRAG_THRESHOLD = 6;

// Variable widths on a shared, fixed height so some pieces read wider than
// others while all stay proportional and aligned. Cycled by project index, so
// the rhythm is identical across the repeated copies (keeps the loop seamless).
const WIDTHS = [
  "w-64 sm:w-80",
  "w-52 sm:w-60",
  "w-80 sm:w-96",
  "w-56 sm:w-64",
  "w-72 sm:w-[22rem]",
  "w-60 sm:w-72",
];

interface ProjectMarqueeProps {
  projects: PortfolioProject[];
  dict: Dictionary;
  caseImages?: Record<string, string[]>;
}

function MarqueeCard({
  project,
  dict,
  width,
  decorative = false,
  onOpen,
}: {
  project: PortfolioProject;
  dict: Dictionary;
  width: string;
  decorative?: boolean;
  onOpen?: (project: PortfolioProject) => void;
}) {
  const className = `group relative block h-72 shrink-0 select-none overflow-hidden rounded-none text-left transition-[border-radius] duration-500 ease-out hover:rounded-tl-[2rem] hover:rounded-br-[2rem] sm:h-80 ${width}`;

  const inner = (
    <>
      <Image
        src={project.image}
        alt=""
        fill
        draggable={false}
        sizes="(max-width: 640px) 320px, 384px"
        className="object-cover grayscale transition-[filter,transform] duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-text/80 via-text/0 to-text/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-bg opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <p className="font-heading text-base font-medium">{project.title}</p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-bg/80">
          {project.label ?? project.category}
          {project.year ? ` · ${project.year}` : ""}
        </p>
      </div>
    </>
  );

  if (decorative) {
    return (
      <div aria-hidden tabIndex={-1} draggable={false} className={className}>
        {inner}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onOpen?.(project)}
      aria-label={formatTemplate(dict.featuredProjectsUi.previewLabel, { title: project.title })}
      draggable={false}
      className={className}
    >
      {inner}
    </button>
  );
}

function MarqueeRow({
  projects,
  dict,
  direction,
  onOpen,
}: {
  projects: PortfolioProject[];
  dict: Dictionary;
  direction: "left" | "right";
  onOpen: (project: PortfolioProject) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();
  const period = useRef(0);
  const hovering = useRef(false);
  const dragging = useRef(false);
  const lastPointerX = useRef(0);
  const dragDistance = useRef(0);

  /** Keep x within one seamless period: (-period, 0]. */
  const normalize = (value: number) => {
    const p = period.current;
    if (!p) return value;
    let n = value % p;
    if (n > 0) n -= p;
    return n;
  };

  useAnimationFrame((_, delta) => {
    if (trackRef.current) period.current = trackRef.current.scrollWidth / REPEAT;
    if (dragging.current || hovering.current || prefersReducedMotion) return;
    const dir = direction === "left" ? -1 : 1;
    x.set(normalize(x.get() + dir * SPEED_PX_PER_SEC * (delta / 1000)));
  });

  const items = Array.from({ length: REPEAT }).flatMap((_, copy) =>
    projects.map((project, i) => (
      <MarqueeCard
        key={`${copy}-${project.id}`}
        project={project}
        dict={dict}
        width={WIDTHS[i % WIDTHS.length]}
        decorative={copy !== 0}
        onOpen={onOpen}
      />
    )),
  );

  return (
    <div
      className="cursor-grab overflow-hidden active:cursor-grabbing"
      style={{ touchAction: "pan-y" }}
      onPointerEnter={() => {
        hovering.current = true;
      }}
      onPointerLeave={(event) => {
        hovering.current = false;
        if (dragging.current) {
          dragging.current = false;
          event.currentTarget.releasePointerCapture?.(event.pointerId);
        }
      }}
      onPointerDown={(event) => {
        dragging.current = true;
        dragDistance.current = 0;
        lastPointerX.current = event.clientX;
        event.currentTarget.setPointerCapture?.(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (!dragging.current) return;
        const dx = event.clientX - lastPointerX.current;
        lastPointerX.current = event.clientX;
        dragDistance.current += Math.abs(dx);
        x.set(normalize(x.get() + dx));
      }}
      onPointerUp={(event) => {
        dragging.current = false;
        event.currentTarget.releasePointerCapture?.(event.pointerId);
      }}
      onClickCapture={(event) => {
        // Suppress the card link when the pointer was dragged rather than clicked.
        if (dragDistance.current > DRAG_THRESHOLD) {
          event.preventDefault();
          event.stopPropagation();
        }
      }}
    >
      <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-6">
        {items}
      </motion.div>
    </div>
  );
}

export function ProjectMarquee({ projects, dict, caseImages = {} }: ProjectMarqueeProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeProject = projects.find((project) => project.id === activeId) ?? null;
  const activeImages = activeProject ? caseImages[activeProject.id] ?? [] : [];
  const handleOpen = (project: PortfolioProject) => setActiveId(project.id);

  return (
    <div className="relative flex flex-col gap-6">
      <MarqueeRow projects={projects} dict={dict} direction="left" onOpen={handleOpen} />
      <MarqueeRow projects={[...projects].reverse()} dict={dict} direction="right" onOpen={handleOpen} />
      {/* Edge fades signal the rows continue horizontally (and are scrubbable) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bg to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg to-transparent md:w-24" />

      <ProjectPreviewModal
        project={activeProject}
        images={activeImages}
        dict={dict}
        onClose={() => setActiveId(null)}
      />
    </div>
  );
}
