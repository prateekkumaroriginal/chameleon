import { InteractiveCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useDesignMode } from "@/hooks/useDesignMode";
import type { CSSRule } from "@/types/rule";

interface RuleCardProps {
  rule: CSSRule;
  onToggle: (id: string, enabled: boolean) => void;
  onClick: () => void;
}

export function RuleCard({ rule, onToggle, onClick }: RuleCardProps) {
  const { mode } = useDesignMode();

  const content = (
    <>
      <Switch
        checked={rule.enabled}
        onCheckedChange={(checked) => {
          onToggle(rule.id, checked);
        }}
        onClick={(e) => e.stopPropagation()}
      />
      <div className="flex-1 min-w-0">
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
