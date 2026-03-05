import { Sparkles } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { CSSRule } from "@/types/rule";

interface PopupRuleItemProps {
  rule: CSSRule;
  onToggle: (id: string, enabled: boolean) => void;
  showSeparator: boolean;
}

export function PopupRuleItem({
  rule,
  onToggle,
  showSeparator,
}: PopupRuleItemProps) {
  return (
    <div className="flex flex-col gap-0">
      <div className="flex items-center gap-3 px-3 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/12 text-primary">
          <Sparkles className="h-3.5 w-3.5" />
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="truncate text-sm font-semibold">{rule.name}</p>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="start">
                {rule.name}
              </TooltipContent>
            </Tooltip>
            <p className="truncate font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
              CSS rule
            </p>
          </div>
          <Switch
            checked={rule.enabled}
            onCheckedChange={(checked) => onToggle(rule.id, checked)}
          />
        </div>
      </div>
      {showSeparator && <Separator className="opacity-55" />}
    </div>
  );
}
