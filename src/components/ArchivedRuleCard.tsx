import { RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InteractiveCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { CSSRule } from "@/types/rule";

interface ArchivedRuleCardProps {
  rule: CSSRule;
  onRestore: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ArchivedRuleCard({
  rule,
  onRestore,
  onDelete,
}: ArchivedRuleCardProps) {
  return (
    <InteractiveCard className="flex-row items-center justify-between px-4 py-3 gap-0">
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
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onRestore(rule.id)}
        >
          <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
          Restore
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 className="h-3.5 w-3.5 mr-1.5" />
              Delete
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete permanently?</DialogTitle>
              <DialogDescription>
                This will permanently delete the rule "{rule.name}". This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="destructive"
                onClick={() => onDelete(rule.id)}
              >
                Delete permanently
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </InteractiveCard>
  );
}
