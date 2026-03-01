import { useNavigate } from "react-router-dom";
import { Plus, Archive, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useRules } from "@/hooks/useRules";

export function RulesList() {
  const { rules, loading, toggle } = useRules();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">CSS Rules</h2>
          <p className="text-sm text-muted-foreground">
            Manage your custom CSS injection rules
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/archived")}
          >
            <Archive className="h-4 w-4 mr-2" />
            Archived
          </Button>
          <Button onClick={() => navigate("/new")}>
            <Plus className="h-4 w-4 mr-2" />
            New Rule
          </Button>
        </div>
      </div>

      <Separator />

      {/* Rules list */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground animate-pulse">Loading rules…</p>
        </div>
      ) : rules.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-12 gap-3">
          <p className="text-muted-foreground">No CSS rules yet</p>
          <Button onClick={() => navigate("/new")} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Create your first rule
          </Button>
        </Card>
      ) : (
        <div className="space-y-2">
          {rules.map((rule) => (
            <Card
              key={rule.id}
              className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => navigate(`/edit/${rule.id}`)}
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
              <div className="flex items-center gap-3">
                <Switch
                  checked={rule.enabled}
                  onCheckedChange={(checked) => {
                    // Prevent card click from firing
                    toggle(rule.id, checked);
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
