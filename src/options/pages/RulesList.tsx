import { useNavigate } from "react-router-dom";
import { Archive, Plus, Braces } from "lucide-react";
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
    <div className="flex flex-col gap-6">
      <PageHeader
        title="CSS Rules"
        description="Manage precision CSS injections by site, then toggle them from a calmer, theme-aware popup."
        actions={
          <>
            <Button variant="outline" onClick={() => navigate("/archived")}>
              <Archive className="h-4 w-4" />
              Archived
            </Button>
            <Button onClick={() => navigate("/new")}>
              <Plus className="h-4 w-4" />
              New Rule
            </Button>
          </>
        }
      />

      <Separator className="opacity-60" />

      {loading ? (
        <div className="surface-card flex items-center justify-center rounded-[1.5rem] border border-white/10 px-6 py-14">
          <p className="animate-pulse text-muted-foreground">Loading rules...</p>
        </div>
      ) : rules.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Braces />
            </EmptyMedia>
            <EmptyTitle>No CSS rules yet</EmptyTitle>
          </EmptyHeader>
          <EmptyContent>
            <p className="text-sm leading-6 text-muted-foreground">
              Start with one focused override instead of a giant stylesheet.
            </p>
            <Button onClick={() => navigate("/new")} variant="outline">
              <Plus className="h-4 w-4" />
              Create your first rule
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="grid gap-3">
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
