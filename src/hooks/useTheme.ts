import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { THEME_STORAGE_KEY } from "@/config";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: Theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function useThemeProvider(): ThemeContextValue {
  const [theme, setThemeState] = useState<Theme>(getSystemTheme);

  // Load persisted theme on mount
  useEffect(() => {
    chrome.storage.local.get(THEME_STORAGE_KEY, (result) => {
      const saved = result[THEME_STORAGE_KEY] as Theme | undefined;
      if (saved === "light" || saved === "dark") {
        setThemeState(saved);
        applyTheme(saved);
      } else {
        applyTheme(getSystemTheme());
      }
    });
  }, []);

  // Apply theme class whenever it changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    chrome.storage.local.set({ [THEME_STORAGE_KEY]: newTheme });
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      chrome.storage.local.set({ [THEME_STORAGE_KEY]: next });
      return next;
    });
  }, []);

  return { theme, setTheme, toggleTheme };
}

export { ThemeContext };

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
