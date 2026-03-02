import { useNavigate } from "react-router-dom";
import { Plus, Archive, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/PageHeader";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyContent,
} from "@/components/ui/empty";
import { RuleCard } from "@/components/RuleCard";
import { useRules } from "@/hooks/useRules";

export function RulesList() {
  const { rules, loading, toggle } = useRules();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader
        title="CSS Rules"
        description="Manage your custom CSS injection rules"
        actions={
          <>
            <Button variant="outline" onClick={() => navigate("/archived")}>
              <Archive className="h-4 w-4 mr-2" />
              Archived
            </Button>
            <Button onClick={() => navigate("/new")}>
              <Plus className="h-4 w-4 mr-2" />
              New Rule
            </Button>
          </>
        }
      />

      <Separator />

      {/* Rules list */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground animate-pulse">Loading rules…</p>
        </div>
      ) : rules.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Palette />
            </EmptyMedia>
            <EmptyTitle>No CSS rules yet</EmptyTitle>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={() => navigate("/new")} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Create your first rule
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="space-y-2">
          {rules.map((rule) => (
            <RuleCard
              key={rule.id}
              rule={rule}
              onToggle={toggle}
              onClick={() => navigate(`/edit/${rule.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
