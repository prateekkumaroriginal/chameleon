
import { InteractiveCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import type { Palette } from "@/types/palette";

interface PaletteCardProps {
  palette: Palette;
  onToggle: (id: string, enabled: boolean) => void;
  onClick: () => void;
}

export function PaletteCard({ palette, onToggle, onClick }: PaletteCardProps) {
  const activeVariant = palette.variants.find(
    (v) => v.id === palette.activeVariantId
  );

  return (
    <InteractiveCard
      className="flex-row items-center justify-between px-4 py-3 gap-0 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex-1 min-w-0 mr-4">
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
      <Switch
        checked={palette.enabled}
        onCheckedChange={(checked) => {
          onToggle(palette.id, checked);
        }}
        onClick={(e) => e.stopPropagation()}
      />
    </InteractiveCard>
  );
}
