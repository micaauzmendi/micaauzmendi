"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Self-hosted PDF.js worker (copied to /public, version-matched to the installed
// pdfjs-dist) so the viewer works offline and needs no CDN.
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

interface CvPdfProps {
  file: string;
  loadingLabel: string;
  errorLabel: string;
  /** Zoom multiplier applied on top of the fit-to-container width. */
  scale?: number;
}

/**
 * Renders the real PDF to canvas via PDF.js — the actual document, not
 * pre-rendered images. Pages fit the container width and can be zoomed via the
 * `scale` prop. Loaded through next/dynamic with ssr:false (see CvModal)
 * because PDF.js needs browser APIs.
 */
export default function CvPdf({ file, loadingLabel, errorLabel, scale = 1 }: CvPdfProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [numPages, setNumPages] = useState(0);

  // Track container width so pages render crisply and responsively.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const message = (text: string) => (
    <p className="py-16 text-center font-mono text-xs uppercase tracking-wider text-text-muted">{text}</p>
  );

  const pageWidth = width > 0 ? width * scale : 0;

  return (
    // Full-width measuring box; the inner w-max block centers pages when they fit
    // and lets them overflow (so the parent can scroll horizontally) when zoomed.
    <div ref={containerRef} className="w-full">
      <Document
        file={file}
        onLoadSuccess={({ numPages: n }) => setNumPages(n)}
        loading={message(loadingLabel)}
        error={message(errorLabel)}
        noData={message(errorLabel)}
        className="mx-auto flex w-max flex-col items-center gap-4"
      >
        {pageWidth > 0
          ? Array.from({ length: numPages }, (_, i) => (
              <Page
                key={i}
                pageNumber={i + 1}
                width={pageWidth}
                loading={message(loadingLabel)}
                className="overflow-hidden rounded-sm border border-accent-support/20 shadow-sm"
              />
            ))
          : null}
      </Document>
    </div>
  );
}
