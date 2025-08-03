
"use client"

import { createContext, useContext, useEffect, type ReactNode, useCallback } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: "system" | "light" | "dark";
  storageKey?: string;
  attribute?: string;
  enableSystem?: boolean;
}

interface ThemeProviderState {
  theme: "system" | "light" | "dark";
  setTheme: (theme: "system" | "light" | "dark") => void;
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  attribute = "class",
  enableSystem = true,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useLocalStorage<"system" | "light" | "dark">(
    storageKey,
    defaultTheme
  )

  const applyTheme = useCallback((themeToApply: "light" | "dark") => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(themeToApply);
  }, []);

  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const currentTheme = theme === "system" ? systemTheme : theme;
    applyTheme(currentTheme);

    if (theme === 'system' && enableSystem) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        applyTheme(mediaQuery.matches ? "dark" : "light");
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme, enableSystem, applyTheme]);
  

  const value = {
    theme,
    setTheme: (newTheme: "system" | "light" | "dark") => {
      setTheme(newTheme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
