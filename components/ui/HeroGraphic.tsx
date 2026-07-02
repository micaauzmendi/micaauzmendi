"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Compass, PenTool, Sparkles, Target, CheckCircle2, type LucideIcon } from "lucide-react";

interface Node {
  icon: LucideIcon;
  label: string;
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
}

const nodes: Node[] = [
  { icon: Sparkles, label: "IA", top: "8%", left: "18%", size: 52, duration: 6, delay: 0 },
  { icon: Compass, label: "Investigación", top: "16%", left: "68%", size: 44, duration: 7.5, delay: 0.4 },
  { icon: Target, label: "Estrategia", top: "78%", left: "12%", size: 44, duration: 6.8, delay: 0.8 },
  { icon: PenTool, label: "Diseño", top: "70%", left: "72%", size: 52, duration: 7, delay: 1.2 },
  { icon: CheckCircle2, label: "Validación", top: "42%", left: "82%", size: 40, duration: 6.2, delay: 1.6 },
];

/** Abstract composition: process + AI concepts converging softly around a center glow. No literal imagery. */
export function HeroGraphic() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative aspect-[4/5] w-full" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
        {nodes.map((node, index) => (
          <motion.line
            key={node.label}
            x1={parseFloat(node.left) + 4}
            y1={parseFloat(node.top) + 4}
            x2={50}
            y2={50}
            stroke="var(--color-accent-support)"
            strokeWidth="0.3"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </svg>

      <motion.div
        className="bg-glow-warm absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-2xl"
        animate={prefersReducedMotion ? undefined : { scale: [1, 1.12, 1], opacity: [0.3, 0.45, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />

      {nodes.map((node) => (
        <motion.div
          key={node.label}
          className="absolute flex flex-col items-center gap-2"
          style={{ top: node.top, left: node.left }}
          animate={prefersReducedMotion ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: node.duration, repeat: Infinity, ease: "easeInOut", delay: node.delay }}
        >
          <div
            className="flex items-center justify-center rounded-full border border-accent-support/40 bg-surface/80 shadow-[0_16px_40px_-20px_rgba(45,42,41,0.35)] backdrop-blur-sm"
            style={{ width: node.size, height: node.size }}
          >
            <node.icon size={node.size * 0.42} className="text-accent" aria-hidden="true" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">{node.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
