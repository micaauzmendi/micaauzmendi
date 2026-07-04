import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/types/dictionary";

/**
 * "Back" affordance for the standalone pages (Servicios, Proyectos) that live
 * outside the book. Sits above the section eyebrow and returns the visitor to
 * the home narrative.
 */
export function BackToHome({ dict, className }: { dict: Dictionary; className?: string }) {
  const homePath = dict.locale === "en" ? "/en" : "/";

  return (
    <Link
      href={homePath}
      aria-label={dict.nav.backToHome}
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-text-secondary transition-colors duration-300 hover:text-accent",
        className,
      )}
    >
      <ArrowLeft size={14} aria-hidden="true" />
      {dict.nav.backToHome}
    </Link>
  );
}
