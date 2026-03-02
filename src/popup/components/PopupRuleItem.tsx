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
    <div>
      <div className="flex items-center justify-between py-2">
        <div className="flex-1 min-w-0 mr-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-sm font-medium truncate">{rule.name}</p>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="start">
              {rule.name}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-xs text-muted-foreground font-mono truncate">
                {rule.domain}
              </p>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="start">
              {rule.domain}
            </TooltipContent>
          </Tooltip>
        </div>
        <Switch
          checked={rule.enabled}
          onCheckedChange={(checked) => onToggle(rule.id, checked)}
        />
      </div>
      {showSeparator && <Separator />}
    </div>
  );
}
