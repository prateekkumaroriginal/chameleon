import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { flushSync } from "react-dom";
import {
  DESIGN_MODE_STORAGE_KEY,
  DESIGN_MODES,
  type DesignMode,
} from "@/config";

interface DesignModeContextValue {
  mode: DesignMode;
  setMode: (mode: DesignMode) => void;
}

const DesignModeContext = createContext<DesignModeContextValue | null>(null);

function applyDesignMode(mode: DesignMode) {
  document.documentElement.dataset.design = mode;
}

function isDesignMode(value: unknown): value is DesignMode {
  return DESIGN_MODES.includes(value as DesignMode);
}

export function useDesignModeProvider(): DesignModeContextValue {
  const [mode, setModeState] = useState<DesignMode>("awesome");

  useEffect(() => {
    chrome.storage.local.get(DESIGN_MODE_STORAGE_KEY, (result) => {
      const saved = result[DESIGN_MODE_STORAGE_KEY];
      const nextMode = isDesignMode(saved) ? saved : "awesome";
      setModeState(nextMode);
      applyDesignMode(nextMode);
    });
  }, []);

  useEffect(() => {
    applyDesignMode(mode);
  }, [mode]);

  const setMode = useCallback((newMode: DesignMode) => {
    chrome.storage.local.set({ [DESIGN_MODE_STORAGE_KEY]: newMode });
    flushSync(() => {
      setModeState(newMode);
    });
    applyDesignMode(newMode);
  }, []);

  return { mode, setMode };
}

export { DesignModeContext };

export function useDesignMode(): DesignModeContextValue {
  const ctx = useContext(DesignModeContext);
  if (!ctx) {
    throw new Error("useDesignMode must be used within a DesignModeProvider");
  }
  return ctx;
}
