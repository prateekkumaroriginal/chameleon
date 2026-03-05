import { RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import type { Palette } from "@/types/palette";

interface ArchivedPaletteCardProps {
  palette: Palette;
  onRestore: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ArchivedPaletteCard({
  palette,
  onRestore,
  onDelete,
}: ArchivedPaletteCardProps) {
  return (
    <Card className="flex items-center justify-between px-4 py-3">
      <div className="flex-1 min-w-0 mr-4">
        <div className="flex items-center gap-2">
          <p className="font-medium truncate">{palette.name}</p>
          <Badge variant="secondary" className="text-xs font-mono shrink-0">
            {palette.domain}
          </Badge>
          <Badge variant="outline" className="text-xs shrink-0">
            {palette.variants.length} variant{palette.variants.length !== 1 ? "s" : ""}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {palette.variants.map((v) => v.name).filter(Boolean).join(", ") || "No named variants"}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onRestore(palette.id)}
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
                This will permanently delete the palette "{palette.name}" and all
                its variants. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="destructive"
                onClick={() => onDelete(palette.id)}
              >
                Delete permanently
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
}
