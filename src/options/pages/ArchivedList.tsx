import { useNavigate } from "react-router-dom";
import { Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyContent,
} from "@/components/ui/empty";
import { PageHeader } from "@/components/PageHeader";
import { ArchivedRuleCard } from "@/components/ArchivedRuleCard";
import { useArchivedRules } from "@/hooks/useRules";

export function ArchivedList() {
  const { rules, loading, restore, remove } = useArchivedRules();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <PageHeader
        title="Archived Rules"
        description="Restore or permanently delete archived rules"
        onBack={() => navigate("/")}
      />

      <Separator />

      {/* Archived rules */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground animate-pulse">Loading…</p>
        </div>
      ) : rules.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Archive />
            </EmptyMedia>
            <EmptyTitle>No archived rules</EmptyTitle>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={() => navigate("/")} variant="outline">
              Back to rules
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="space-y-2">
          {rules.map((rule) => (
            <ArchivedRuleCard
              key={rule.id}
              rule={rule}
              onRestore={restore}
              onDelete={remove}
            />
          ))}
        </div>
      )}
    </div>
  );
}
