import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  elevated?: boolean;
}

export function Card({ children, as: Tag = "div", elevated = false, className, ...props }: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-card p-6 transition-shadow duration-300 md:p-8",
        elevated
          ? "bg-surface shadow-[0_24px_70px_-40px_rgba(45,45,45,0.3)]"
          : "bg-surface-muted/70",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
