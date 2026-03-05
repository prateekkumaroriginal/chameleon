import { Check, ChevronDown, SwatchBook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Palette } from "@/types/palette";

interface PopupPaletteItemProps {
  palette: Palette;
  onToggle: (id: string, enabled: boolean) => void;
  onSelectVariant: (id: string, variantId: string) => void;
  showSeparator: boolean;
}

export function PopupPaletteItem({
  palette,
  onToggle,
  onSelectVariant,
  showSeparator,
}: PopupPaletteItemProps) {
  const activeVariant = palette.variants.find(
    (variant) => variant.id === palette.activeVariantId
  );

  return (
    <div className="flex flex-col gap-0">
      <div className="flex items-start gap-3 px-3 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/12 text-primary">
          <SwatchBook className="h-3.5 w-3.5" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 flex-col gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="truncate text-sm font-semibold">{palette.name}</p>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="start">
                  {palette.name}
                </TooltipContent>
              </Tooltip>
              <p className="truncate font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                {palette.variants.length} variant{palette.variants.length !== 1 ? "s" : ""}
              </p>
            </div>
            <Switch
              checked={palette.enabled}
              onCheckedChange={(checked) => onToggle(palette.id, checked)}
            />
          </div>

          {palette.variants.length >= 2 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="xs"
                  className="w-fit max-w-full bg-background/35 px-2.5"
                >
                  <span className="truncate max-w-[124px]">
                    {activeVariant?.name || "Select variant"}
                  </span>
                  <ChevronDown className="opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[160px]">
                {palette.variants.map((variant) => (
                  <DropdownMenuItem
                    key={variant.id}
                    onClick={() => onSelectVariant(palette.id, variant.id)}
                    className="flex items-center gap-2 text-xs"
                  >
                    <span className="flex-1">{variant.name || "Unnamed"}</span>
                    {variant.id === palette.activeVariantId && (
                      <Check className="h-3 w-3 text-primary" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      {showSeparator && <Separator className="opacity-55" />}
    </div>
  );
}
