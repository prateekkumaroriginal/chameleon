import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_THEME,
  THEME_OPTIONS,
  THEME_STORAGE_KEY,
  type AppTheme,
} from "@/config";
import { getStoredTheme, setStoredTheme } from "@/services/themeService";

interface ThemeContextValue {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => Promise<void>;
  toggleTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: AppTheme) {
  document.documentElement.classList.toggle("dark", theme === THEME_OPTIONS.dark);
  document.documentElement.dataset.theme = theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<AppTheme>(DEFAULT_THEME);

  useEffect(() => {
    let mounted = true;

    void getStoredTheme().then((storedTheme) => {
      if (!mounted) {
        return;
      }

      setThemeState(storedTheme);
      applyTheme(storedTheme);
    });

    const handleStorageChange: Parameters<typeof chrome.storage.onChanged.addListener>[0] = (
      changes,
      areaName
    ) => {
      if (areaName !== "local") {
        return;
      }

      const nextTheme = changes[THEME_STORAGE_KEY]?.newValue;
      if (nextTheme !== THEME_OPTIONS.light && nextTheme !== THEME_OPTIONS.dark) {
        return;
      }

      setThemeState(nextTheme);
      applyTheme(nextTheme);
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      mounted = false;
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = async (nextTheme: AppTheme) => {
    setThemeState(nextTheme);
    applyTheme(nextTheme);
    await setStoredTheme(nextTheme);
  };

  const toggleTheme = async () => {
    const nextTheme =
      theme === THEME_OPTIONS.dark ? THEME_OPTIONS.light : THEME_OPTIONS.dark;

    await setTheme(nextTheme);
  };

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
