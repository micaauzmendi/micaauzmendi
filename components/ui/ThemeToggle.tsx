"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import type { Dictionary } from "@/types/dictionary";

const emptySubscribe = () => () => {};

export function ThemeToggle({ dict }: { dict: Dictionary }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? dict.theme.toLight : dict.theme.toDark}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-accent-support/50 text-text transition-colors duration-300 hover:border-accent hover:text-accent"
    >
      {mounted ? isDark ? <Sun size={18} /> : <Moon size={18} /> : <span className="h-[18px] w-[18px]" />}
    </button>
  );
}
