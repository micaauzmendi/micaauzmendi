import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-accent-support/50 px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-text-secondary",
        className,
      )}
    >
      {children}
    </span>
  );
}
