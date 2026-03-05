import { ChevronDown, Check } from "lucide-react";
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
    (v) => v.id === palette.activeVariantId
  );

  return (
    <div>
      <div className="flex items-center gap-3 py-2">
        <Switch
          checked={palette.enabled}
          onCheckedChange={(checked) => onToggle(palette.id, checked)}
        />
        <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-sm font-medium truncate flex-1 text-left">{palette.name}</p>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="start">
              {palette.name}
            </TooltipContent>
          </Tooltip>

          {/* Variant dropdown — only when 2+ variants */}
          {palette.variants.length >= 2 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="xs"
                  className="font-normal shrink-0"
                >
                  <span className="truncate max-w-[80px]">
                    {activeVariant?.name || "Select variant"}
                  </span>
                  <ChevronDown className="opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[140px]">
                {palette.variants.map((variant) => (
                  <DropdownMenuItem
                    key={variant.id}
                    onClick={() => onSelectVariant(palette.id, variant.id)}
                    className="text-xs flex items-center gap-2"
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
      {showSeparator && <Separator />}
    </div>
  );
}
