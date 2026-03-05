import { useNavigate } from "react-router-dom";
import { Palette } from "lucide-react";
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
import { ArchivedPaletteCard } from "@/components/ArchivedPaletteCard";
import { useArchivedPalettes } from "@/hooks/usePalettes";

export function ArchivedPalettesList() {
  const { palettes, loading, restore, remove } = useArchivedPalettes();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Archived Palettes"
        description="Restore or permanently delete archived palettes"
        onBack={() => navigate("/?tab=palettes")}
      />

      <Separator />

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground animate-pulse">Loading…</p>
        </div>
      ) : palettes.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Palette />
            </EmptyMedia>
            <EmptyTitle>No archived palettes</EmptyTitle>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={() => navigate("/?tab=palettes")} variant="outline">
              Back to palettes
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="space-y-2">
          {palettes.map((palette) => (
            <ArchivedPaletteCard
              key={palette.id}
              palette={palette}
              onRestore={restore}
              onDelete={remove}
            />
          ))}
        </div>
      )}
    </div>
  );
}
