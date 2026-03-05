import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
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
    (variant) => variant.id === palette.activeVariantId
  );

  return (
    <Card
      className="cursor-pointer gap-4 rounded-[1.55rem] border-white/10 px-5 py-4 transition-transform duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-accent/35"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-serif text-xl font-semibold leading-none">{palette.name}</p>
            <Badge variant="secondary" className="rounded-full bg-primary/12 font-mono normal-case tracking-[0.08em] text-primary">
              {palette.domain}
            </Badge>
            <Badge variant="outline" className="rounded-full border-border/80 bg-background/35 tracking-[0.14em]">
              {palette.variants.length} variant{palette.variants.length !== 1 ? "s" : ""}
            </Badge>
          </div>
          {activeVariant && (
            <p className="text-sm text-muted-foreground">
              Active variant: <span className="font-semibold text-foreground">{activeVariant.name}</span>
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Switch
            checked={palette.enabled}
            onCheckedChange={(checked) => {
              onToggle(palette.id, checked);
            }}
            onClick={(event) => event.stopPropagation()}
          />
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </Card>
  );
}
