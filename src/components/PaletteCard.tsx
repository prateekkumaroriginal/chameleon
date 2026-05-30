import { InteractiveCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useDesignMode } from "@/hooks/useDesignMode";
import type { Palette } from "@/types/palette";

interface PaletteCardProps {
  palette: Palette;
  onToggle: (id: string, enabled: boolean) => void;
  onClick: () => void;
}

export function PaletteCard({ palette, onToggle, onClick }: PaletteCardProps) {
  const { mode } = useDesignMode();
  const activeVariant = palette.variants.find(
    (v) => v.id === palette.activeVariantId
  );

  const content = (
    <>
      <Switch
        checked={palette.enabled}
        onCheckedChange={(checked) => {
          onToggle(palette.id, checked);
        }}
        onClick={(e) => e.stopPropagation()}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium truncate">{palette.name}</p>
          <Badge variant="secondary" className="text-xs font-mono shrink-0">
            {palette.domain}
          </Badge>
          <Badge variant="outline" className="text-xs shrink-0">
            {palette.variants.length} variant{palette.variants.length !== 1 ? "s" : ""}
          </Badge>
        </div>
        {activeVariant && (
          <p className="text-xs text-muted-foreground mt-1">
            Active: <span className="font-medium">{activeVariant.name}</span>
          </p>
        )}
      </div>
    </>
  );

  if (mode === "boring") {
    return (
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={onClick}
      >
        {content}
      </div>
    );
  }

  return (
    <InteractiveCard
      className="flex-row items-center px-4 py-3 gap-3 cursor-pointer"
      onClick={onClick}
    >
      {content}
    </InteractiveCard>
  );
}
