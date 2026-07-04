"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, ExternalLink, X } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/types/dictionary";

const CV_PATH = "/cv-mica-auzmendi.pdf";
/** Page images live in /public/cv, regenerated whenever the PDF changes. */
const CV_PAGE_COUNT = 2;

interface CvModalProps {
  dict: Dictionary;
  open: boolean;
  onClose: () => void;
}

/**
 * Preview of the CV. The pages are shown as pre-rendered images (reliable across
 * browsers, unlike embedding the raw PDF, which some viewers force-download),
 * and the original PDF can be downloaded from the header.
 */
export function CvModal({ dict, open, onClose }: CvModalProps) {
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

  const pages = Array.from({ length: CV_PAGE_COUNT }, (_, i) => i + 1);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-8"
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
            aria-labelledby="cv-modal-title"
            className="relative z-10 flex h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-card bg-surface shadow-[0_40px_100px_-30px_rgba(45,42,41,0.5)]"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between gap-4 border-b border-accent-support/20 px-6 py-4">
              <h3 id="cv-modal-title" className="font-heading text-lg font-medium text-text">
                {dict.cta.cvModalTitle}
              </h3>
              <div className="flex items-center gap-2">
                <Button href={CV_PATH} download variant="primary" className="!px-4 !py-2 !text-xs uppercase">
                  <Download size={14} aria-hidden="true" />
                  {dict.cta.downloadCvButton}
                </Button>
                <button
                  type="button"
                  aria-label={dict.cta.closeModalLabel}
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:text-accent"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto bg-surface-muted/30 p-4 md:p-6">
              <div className="mx-auto flex max-w-2xl flex-col gap-4">
                {pages.map((page) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={page}
                    src={`/cv/page-${String(page).padStart(2, "0")}.jpg`}
                    alt={`${dict.cta.cvModalTitle} — ${page}/${CV_PAGE_COUNT}`}
                    loading={page === 1 ? "eager" : "lazy"}
                    className="w-full rounded-sm border border-accent-support/20 shadow-sm"
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center border-t border-accent-support/20 px-6 py-3">
              <a
                href={CV_PATH}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-text-secondary transition-colors hover:text-accent"
              >
                {dict.cta.openPdfLink} <ExternalLink size={12} aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
