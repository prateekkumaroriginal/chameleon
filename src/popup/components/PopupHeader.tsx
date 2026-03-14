import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { APP_NAME } from "@/config";
import iconUrl from "@/assets/icon-48.png";

interface PopupHeaderProps {
  onOpenSettings: () => void;
}

export function PopupHeader({ onOpenSettings }: PopupHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b">
      <div className="flex items-center gap-2">
        <img src={iconUrl} alt="Chameleon Logo" className="h-5 w-5 object-contain" />
        <h1 className="text-base font-semibold">{APP_NAME}</h1>
      </div>
      <div className="flex items-center gap-1">
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          onClick={onOpenSettings}
          title="Open settings"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
