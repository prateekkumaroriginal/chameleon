import { useNavigate } from "react-router-dom";
import { ArrowLeft, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useArchivedRules } from "@/hooks/useRules";

export function ArchivedList() {
  const { rules, loading, restore, remove } = useArchivedRules();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Archived Rules</h2>
          <p className="text-sm text-muted-foreground">
            Restore or permanently delete archived rules
          </p>
        </div>
      </div>

      <Separator />

      {/* Archived rules */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground animate-pulse">Loading…</p>
        </div>
      ) : rules.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-12 gap-3">
          <p className="text-muted-foreground">No archived rules</p>
          <Button onClick={() => navigate("/")} variant="outline">
            Back to rules
          </Button>
        </Card>
      ) : (
        <div className="space-y-2">
          {rules.map((rule) => (
            <Card
              key={rule.id}
              className="flex items-center justify-between px-4 py-3"
            >
              <div className="flex-1 min-w-0 mr-4">
                <div className="flex items-center gap-2">
                  <p className="font-medium truncate">{rule.name}</p>
                  <Badge
                    variant="secondary"
                    className="text-xs font-mono shrink-0"
                  >
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
                  onClick={() => restore(rule.id)}
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
                        This will permanently delete the rule "{rule.name}".
                        This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="destructive"
                        onClick={() => remove(rule.id)}
                      >
                        Delete permanently
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
