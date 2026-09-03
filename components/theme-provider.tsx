"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<
  ThemeContextValue | undefined
>(undefined);

const STORAGE_KEY = "theme";

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [theme, setThemeState] =
    useState<Theme>("light");

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    try {
      const stored =
        window.localStorage.getItem(
          STORAGE_KEY
        );

      if (
        stored === "dark" ||
        stored === "light"
      ) {
        setThemeState(stored);
      } else {
        const systemTheme =
          window.matchMedia(
            "(prefers-color-scheme: dark)"
          ).matches
            ? "dark"
            : "light";

        setThemeState(systemTheme);
      }
    } catch {
      setThemeState("light");
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        theme
      );
    } catch {
      // Ignore localStorage errors
    }
  }, [theme, mounted]);

  const setTheme = (
    nextTheme: Theme
  ) => {
    setThemeState(nextTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx =
    useContext(ThemeContext);

  if (!ctx) {
    throw new Error(
      "useTheme must be used within a ThemeProvider"
    );
  }

  return ctx;
}