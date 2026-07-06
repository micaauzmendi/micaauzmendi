"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, ExternalLink, X, ZoomIn, ZoomOut } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/types/dictionary";

const CV_PATH = "/cv-mica-auzmendi.pdf";
const MIN_ZOOM = 0.6;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;

// PDF.js needs browser APIs, so the viewer is loaded client-side only.
const CvPdf = dynamic(() => import("@/components/sections/CvPdf"), { ssr: false });

interface CvModalProps {
  dict: Dictionary;
  open: boolean;
  onClose: () => void;
}

/**
 * Preview of the CV. The real PDF is rendered to canvas with PDF.js (see CvPdf),
 * so it shows the actual document — not pre-rendered images — reliably across
 * browsers. The original file can be downloaded from the header or opened in a
 * new tab from the footer.
 */
export function CvModal({ dict, open, onClose }: CvModalProps) {
  const loadingLabel = dict.locale === "en" ? "Loading CV…" : "Cargando CV…";
  const errorLabel = dict.locale === "en" ? "Couldn't load the CV." : "No se pudo cargar el CV.";
  const zoomOutLabel = dict.locale === "en" ? "Zoom out" : "Alejar";
  const zoomInLabel = dict.locale === "en" ? "Zoom in" : "Acercar";
  const resetZoomLabel = dict.locale === "en" ? "Reset zoom" : "Restablecer zoom";

  const [scale, setScale] = useState(1);
  const zoomOut = () => setScale((s) => Math.max(MIN_ZOOM, Math.round((s - ZOOM_STEP) * 100) / 100));
  const zoomIn = () => setScale((s) => Math.min(MAX_ZOOM, Math.round((s + ZOOM_STEP) * 100) / 100));

  // Reset the zoom each time the modal is opened.
  useEffect(() => {
    if (open) setScale(1);
  }, [open]);

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

            <div className="min-h-0 flex-1 overflow-auto bg-surface-muted/30 p-4 md:p-6">
              {open ? <CvPdf file={CV_PATH} loadingLabel={loadingLabel} errorLabel={errorLabel} scale={scale} /> : null}
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-accent-support/20 px-4 py-3 md:px-6">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={zoomOut}
                  disabled={scale <= MIN_ZOOM}
                  aria-label={zoomOutLabel}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-text-secondary transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ZoomOut size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setScale(1)}
                  aria-label={resetZoomLabel}
                  className="min-w-[3.5ch] text-center font-mono text-xs tabular-nums text-text-secondary transition-colors hover:text-accent"
                >
                  {Math.round(scale * 100)}%
                </button>
                <button
                  type="button"
                  onClick={zoomIn}
                  disabled={scale >= MAX_ZOOM}
                  aria-label={zoomInLabel}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-text-secondary transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ZoomIn size={16} />
                </button>
              </div>
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
