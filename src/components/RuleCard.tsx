
import { InteractiveCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import type { CSSRule } from "@/types/rule";

interface RuleCardProps {
  rule: CSSRule;
  onToggle: (id: string, enabled: boolean) => void;
  onClick: () => void;
}

export function RuleCard({ rule, onToggle, onClick }: RuleCardProps) {
  return (
    <InteractiveCard
      className="flex-row items-center justify-between px-4 py-3 gap-0 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex-1 min-w-0 mr-4">
        <div className="flex items-center gap-2">
          <p className="font-medium truncate">{rule.name}</p>
          <Badge variant="secondary" className="text-xs font-mono shrink-0">
            {rule.domain}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-1 truncate font-mono">
          {rule.css.slice(0, 80)}
          {rule.css.length > 80 ? "…" : ""}
        </p>
      </div>
      <Switch
        checked={rule.enabled}
        onCheckedChange={(checked) => {
          onToggle(rule.id, checked);
        }}
        onClick={(e) => e.stopPropagation()}
      />
    </InteractiveCard>
  );
}
