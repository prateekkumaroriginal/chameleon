import { Monitor, Moon, Sun, Sparkles, Meh, type LucideIcon } from "lucide-react";
import type { ThemePreference } from "@/config";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/useTheme";
import { useDesignMode } from "@/hooks/useDesignMode";
import type { DesignMode } from "@/config";

const PREFERENCE_ICONS: Record<ThemePreference, LucideIcon> = {
  system: Monitor,
  light: Sun,
  dark: Moon,
};

export function ThemeToggle() {
  const { preference, setPreference } = useTheme();
  const { mode, setMode } = useDesignMode();
  const PreferenceIcon = PREFERENCE_ICONS[preference];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label="Choose color theme"
          aria-haspopup="menu"
        >
          <PreferenceIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40 rounded-xl">
        <DropdownMenuLabel className="text-xs text-muted-foreground font-medium">
          Design
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={mode}
          onValueChange={(value) => setMode(value as DesignMode)}
        >
          <DropdownMenuRadioItem
            value="awesome"
            className="cursor-pointer gap-2 rounded-lg py-2 pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto"
          >
            <Sparkles className="size-4 shrink-0 text-muted-foreground" />
            Awesome
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="boring"
            className="cursor-pointer gap-2 rounded-lg py-2 pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto"
          >
            <Meh className="size-4 shrink-0 text-muted-foreground" />
            Boring
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-xs text-muted-foreground font-medium">
          Theme
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={preference}
          onValueChange={(value) => setPreference(value as ThemePreference)}
        >
          <DropdownMenuRadioItem
            value="system"
            className="cursor-pointer gap-2 rounded-lg py-2 pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto"
          >
            <Monitor className="size-4 shrink-0 text-muted-foreground" />
            System
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="light"
            className="cursor-pointer gap-2 rounded-lg py-2 pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto"
          >
            <Sun className="size-4 shrink-0 text-muted-foreground" />
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="dark"
            className="cursor-pointer gap-2 rounded-lg py-2 pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto"
          >
            <Moon className="size-4 shrink-0 text-muted-foreground" />
            Dark
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
