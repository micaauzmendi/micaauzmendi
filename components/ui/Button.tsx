import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-heading text-sm font-medium tracking-wide transition-colors duration-300 ease-out";

const variants = {
  primary: "bg-text text-bg hover:bg-accent dark:hover:bg-accent",
  outline: "border border-text/30 text-text hover:border-accent hover:text-accent",
};

interface CommonProps {
  variant?: keyof typeof variants;
  children: ReactNode;
  className?: string;
}

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type LinkProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

/**
 * Buttons only change color on hover — no movement, no scale. The transition is
 * limited to `colors` so the button never shifts position under the cursor.
 */
export function Button({ variant = "primary", children, className, ...props }: ButtonProps | LinkProps) {
  const classes = cn(base, variants[variant], className);

  if ("href" in props && props.href) {
    return (
      <a className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
