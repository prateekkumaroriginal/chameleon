import { useNavigate } from "react-router-dom";
import { Archive, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { GroupedList, GroupedListItem } from "@/components/ui/grouped-list";
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
import { useDesignMode } from "@/hooks/useDesignMode";

export function ArchivedList() {
  const { rules, loading, restore, remove } = useArchivedRules();
  const navigate = useNavigate();
  const { mode } = useDesignMode();

  return (
    <div className="space-y-6">
      {/* Top bar */}
      {mode === "boring" ? (
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold">Archived Rules</h2>
          {!loading && rules.length > 0 && (
            <Badge variant="secondary">{rules.length}</Badge>
          )}
        </div>
      ) : (
        <>
          <PageHeader
            title="Archived Rules"
            description="Restore or permanently delete archived rules"
            onBack={() => navigate("/")}
          />
          <Separator />
        </>
      )}

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
      ) : mode === "boring" ? (
        <GroupedList>
          {rules.map((rule) => (
            <GroupedListItem key={rule.id} className="hover:bg-transparent">
              <ArchivedRuleCard
                rule={rule}
                onRestore={restore}
                onDelete={remove}
              />
            </GroupedListItem>
          ))}
        </GroupedList>
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
