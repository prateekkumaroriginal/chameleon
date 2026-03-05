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
      <div className="flex items-center gap-3 py-2">
        <Switch
          checked={rule.enabled}
          onCheckedChange={(checked) => onToggle(rule.id, checked)}
        />
        <div className="flex-1 min-w-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-sm font-medium truncate w-full">{rule.name}</p>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="start">
              {rule.name}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      {showSeparator && <Separator />}
    </div>
  );
}
