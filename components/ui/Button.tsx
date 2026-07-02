"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-heading text-sm font-medium tracking-wide transition-colors duration-300";

const variants = {
  primary: "bg-text text-bg hover:bg-accent dark:hover:bg-accent",
  outline: "border border-text/30 text-text hover:border-accent hover:text-accent",
};

interface CommonProps {
  variant?: keyof typeof variants;
  children: ReactNode;
  className?: string;
}

/** Drag/animation handlers are omitted: their DOM event types conflict with framer-motion's own. */
type ConflictingHandlers = "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd";

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, ConflictingHandlers> & {
    href?: undefined;
  };

type LinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, ConflictingHandlers> & {
    href: string;
  };

const MAX_PULL = 6;

/** Very subtly pulls the button toward the cursor within its bounds — disabled for reduced motion. */
function useMagnetic() {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 150, damping: 18, mass: 0.4 });

  if (prefersReducedMotion) {
    return { style: {}, onMouseMove: undefined, onMouseLeave: undefined };
  }

  return {
    style: { x: springX, y: springY },
    onMouseMove: (event: MouseEvent<HTMLElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const relX = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const relY = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      x.set(Math.max(-1, Math.min(1, relX)) * MAX_PULL);
      y.set(Math.max(-1, Math.min(1, relY)) * MAX_PULL);
    },
    onMouseLeave: () => {
      x.set(0);
      y.set(0);
    },
  };
}

export function Button({ variant = "primary", children, className, ...props }: ButtonProps | LinkProps) {
  const classes = cn(base, variants[variant], className);
  const magnetic = useMagnetic();

  if ("href" in props && props.href) {
    return (
      <motion.a
        className={classes}
        style={magnetic.style}
        onMouseMove={magnetic.onMouseMove}
        onMouseLeave={magnetic.onMouseLeave}
        {...(props as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, ConflictingHandlers>)}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      style={magnetic.style}
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      {...(props as Omit<ButtonHTMLAttributes<HTMLButtonElement>, ConflictingHandlers>)}
    >
      {children}
    </motion.button>
  );
}
