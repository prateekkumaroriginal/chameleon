import type { ReactNode } from "react";
import { ThemeContext, useThemeProvider } from "@/hooks/useTheme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const themeValue = useThemeProvider();

  return (
    <ThemeContext value={themeValue}>
      {children}
    </ThemeContext>
  );
}
