
"use client"

import { createContext, useContext, useEffect, type ReactNode } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: "system" | "light" | "dark";
  storageKey?: string;
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
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useLocalStorage<"system" | "light" | "dark">(
    storageKey,
    defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: "system" | "light" | "dark") => {
      setTheme(theme)
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
