"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Info, X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import type { PortfolioProject } from "@/types/content";
import type { Dictionary } from "@/types/dictionary";

interface ProjectPreviewModalProps {
  project: PortfolioProject | null;
  images: string[];
  dict: Dictionary;
  onClose: () => void;
}

export function ProjectPreviewModal({ project, images, dict, onClose }: ProjectPreviewModalProps) {
  const open = project !== null;

  // Proyectos con caso completo cargado muestran su galería; los que todavía no
  // la tienen caen a su portada (la misma imagen que se ve en la tarjeta de
  // trabajos) para que la vista previa nunca quede vacía.
  const hasCaseGallery = images.length > 0;
  const gallery = hasCaseGallery ? images : project ? [project.image] : [];

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center px-4 py-10 md:py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label={dict.cta.closeModalLabel}
            className="absolute inset-0 bg-text/40 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="preview-modal-title"
            className="relative z-10 flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-card bg-surface shadow-[0_40px_100px_-30px_rgba(45,42,41,0.5)]"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-accent-support/20 px-6 py-5 md:px-8">
              <div className="min-w-0">
                <h3 id="preview-modal-title" className="font-heading text-xl font-medium text-text md:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-text-muted">
                  {project.label ?? project.category}
                  {project.year ? ` · ${project.year}` : ""}
                </p>
              </div>
              <button
                type="button"
                aria-label={dict.cta.closeModalLabel}
                onClick={onClose}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-text-secondary transition-colors hover:text-accent"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto">
              <p className="px-6 pt-5 text-sm text-text-secondary md:px-8">{project.description}</p>

              {gallery.length > 0 ? (
                <>
                  {hasCaseGallery ? (
                    <div className="mx-6 mt-4 flex items-start gap-2 rounded-lg border border-accent-support/30 bg-accent/[0.06] px-3 py-2.5 md:mx-8">
                      <Info size={14} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                      <p className="font-mono text-[11px] leading-relaxed text-text-secondary">
                        {dict.featuredProjectsUi.previewQualityNote}
                      </p>
                    </div>
                  ) : null}

                  <div className="mt-4 flex flex-col">
                    {gallery.map((src, index) => (
                      <div key={src} className="relative w-full bg-bg">
                        <Image
                          src={src}
                          alt={`${project.title} — ${index + 1}`}
                          width={1400}
                          height={0}
                          quality={90}
                          sizes="(min-width: 768px) 700px, 100vw"
                          className="h-auto w-full"
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="px-6 py-14 text-center font-mono text-xs uppercase tracking-wider text-text-muted md:px-8">
                  {dict.featuredProjectsUi.previewUnavailable}
                </p>
              )}
            </div>

            {/* Footer CTA */}
            <div className="border-t border-accent-support/20 px-6 py-4 md:px-8">
              <Button href={project.behanceUrl} target="_blank" rel="noreferrer" variant="primary" className="w-full">
                {dict.featuredProjectsUi.viewFullCase}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
