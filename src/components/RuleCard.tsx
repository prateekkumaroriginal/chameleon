import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
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
    <Card
      className="cursor-pointer gap-4 rounded-[1.55rem] border-white/10 px-5 py-4 transition-transform duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-accent/35"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-serif text-xl font-semibold leading-none">{rule.name}</p>
            <Badge variant="secondary" className="rounded-full bg-primary/12 font-mono normal-case tracking-[0.08em] text-primary">
              {rule.domain}
            </Badge>
          </div>
          <p className="line-clamp-2 font-mono text-xs leading-5 text-muted-foreground">
            {rule.css.slice(0, 140)}
            {rule.css.length > 140 ? "..." : ""}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Switch
            checked={rule.enabled}
            onCheckedChange={(checked) => {
              onToggle(rule.id, checked);
            }}
            onClick={(event) => event.stopPropagation()}
          />
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </Card>
  );
}
