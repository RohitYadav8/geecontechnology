"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ variant = "default" }: { variant?: "default" | "glass" } = {}) {
  const glass = variant === "glass";
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Server aur first client render same HTML rakhenge
  if (!mounted) {
    return (
      <div
        className={glass ? "h-10 w-10 rounded-xl border border-white/30 bg-white/10" : "h-9 w-9 rounded-md border border-slate-200 dark:border-slate-700"}
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className={glass ? "flex h-10 w-10 items-center justify-center rounded-xl border border-white/30 bg-white/10 text-white backdrop-blur-xl transition-colors hover:bg-white/20" : "flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"}
    >
      {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}