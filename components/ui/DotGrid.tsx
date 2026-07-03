import { cn } from "@/lib/utils";

interface DotGridProps {
  rows?: number;
  cols?: number;
  className?: string;
}

/** A small regular dot grid (sketch-canvas / FigJam texture) — decorative, used sparingly. */
export function DotGrid({ rows = 6, cols = 6, className }: DotGridProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("grid w-fit gap-2 text-accent-support", className)}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: rows * cols }).map((_, index) => (
        <span key={index} className="h-1 w-1 rounded-full bg-current" />
      ))}
    </div>
  );
}
