import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { flushSync } from "react-dom";
import {
  THEME_PREFERENCES,
  THEME_SHOCKWAVE_DURATION_MS,
  THEME_STORAGE_KEY,
  type ResolvedTheme,
  type ThemePreference,
} from "@/config";

interface ThemeContextValue {
  preference: ThemePreference;
  resolvedTheme: ResolvedTheme;
  setPreference: (preference: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
  skipTransition: () => void;
};

type DocumentWithViewTransition = Document & {
  startViewTransition?: (updateCallback: () => void) => ThemeViewTransition;
};

function applyTheme(theme: ResolvedTheme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function isThemePreference(value: unknown): value is ThemePreference {
  return THEME_PREFERENCES.includes(value as ThemePreference);
}

function resolveTheme(preference: ThemePreference): ResolvedTheme {
  return preference === "system" ? getSystemTheme() : preference;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function animateThemeShockwave(viewTransition: ThemeViewTransition): void {
  void viewTransition.ready
    .then(() => {
      const x = window.innerWidth / 2;
      const y = 0;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: THEME_SHOCKWAVE_DURATION_MS,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    })
    .catch(() => {
      viewTransition.skipTransition();
    });
}

export function useThemeProvider(): ThemeContextValue {
  const [preference, setPreferenceState] = useState<ThemePreference>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(getSystemTheme);

  useEffect(() => {
    chrome.storage.local.get(THEME_STORAGE_KEY, (result) => {
      const saved = result[THEME_STORAGE_KEY];
      const nextPreference = isThemePreference(saved) ? saved : "system";
      const nextResolvedTheme = resolveTheme(nextPreference);

      setPreferenceState(nextPreference);
      setResolvedTheme(nextResolvedTheme);
      applyTheme(nextResolvedTheme);
    });
  }, []);

  useEffect(() => {
    const nextResolvedTheme = resolveTheme(preference);

    setResolvedTheme(nextResolvedTheme);
    applyTheme(nextResolvedTheme);
  }, [preference]);

  useEffect(() => {
    if (preference !== "system") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const nextResolvedTheme = getSystemTheme();

      setResolvedTheme(nextResolvedTheme);
      applyTheme(nextResolvedTheme);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [preference]);

  const setPreference = useCallback((newPreference: ThemePreference) => {
    const nextResolvedTheme = resolveTheme(newPreference);
    const updateTheme = () => {
      flushSync(() => {
        setPreferenceState(newPreference);
        setResolvedTheme(nextResolvedTheme);
      });
      applyTheme(nextResolvedTheme);
    };

    chrome.storage.local.set({ [THEME_STORAGE_KEY]: newPreference });

    const viewTransitionDocument = document as DocumentWithViewTransition;
    if (!viewTransitionDocument.startViewTransition || prefersReducedMotion()) {
      updateTheme();
      return;
    }

    const root = document.documentElement;
    root.dataset.themeTransition = "top-shockwave";
    const viewTransition = viewTransitionDocument.startViewTransition(updateTheme);
    animateThemeShockwave(viewTransition);
    void viewTransition.finished
      .finally(() => {
        delete root.dataset.themeTransition;
      })
      .catch(() => {
        delete root.dataset.themeTransition;
      });
  }, []);

  return { preference, resolvedTheme, setPreference };
}

export { ThemeContext };

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
