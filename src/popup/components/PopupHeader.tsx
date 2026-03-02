import { Settings, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/config";

interface PopupHeaderProps {
  onOpenSettings: () => void;
}

export function PopupHeader({ onOpenSettings }: PopupHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b">
      <div className="flex items-center gap-2">
        <Palette className="h-5 w-5 text-primary" />
        <h1 className="text-base font-semibold">{APP_NAME}</h1>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onOpenSettings}
        title="Open settings"
      >
        <Settings className="h-4 w-4" />
      </Button>
    </div>
  );
}
