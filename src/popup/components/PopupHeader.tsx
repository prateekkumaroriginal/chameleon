import { Settings } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { APP_NAME, APP_TAGLINE } from "@/config";
import iconUrl from "@/assets/icon-48.png";

interface PopupHeaderProps {
  onOpenSettings: () => void;
}

export function PopupHeader({ onOpenSettings }: PopupHeaderProps) {
  return (
    <div className="relative flex items-start justify-between gap-3 border-b border-white/10 px-4 py-4">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 shadow-[0_14px_30px_color-mix(in_oklab,var(--primary)_24%,transparent)] backdrop-blur-sm">
          <img src={iconUrl} alt="Chameleon Logo" className="h-6 w-6 object-contain" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="editorial-kicker text-[0.66rem] font-semibold uppercase">Extension control</span>
          <div className="flex flex-col gap-0.5">
            <h1 className="font-serif text-xl font-semibold leading-none">{APP_NAME}</h1>
            <p className="max-w-[180px] text-xs leading-4 text-muted-foreground">{APP_TAGLINE}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle compact />
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onOpenSettings}
          title="Open settings"
          className="bg-white/6 text-muted-foreground hover:bg-white/12 hover:text-foreground"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
