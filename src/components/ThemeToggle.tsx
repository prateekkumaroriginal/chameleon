import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { THEME_OPTIONS } from "@/config";

interface ThemeToggleProps {
  compact?: boolean;
}

export function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === THEME_OPTIONS.dark;

  return (
    <Button
      type="button"
      variant="outline"
      size={compact ? "icon-sm" : "sm"}
      onClick={() => void toggleTheme()}
      className="theme-toggle border-white/12 bg-white/8 text-foreground hover:bg-white/14"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
      {!compact && <span>{isDark ? "Light mode" : "Dark mode"}</span>}
    </Button>
  );
}
