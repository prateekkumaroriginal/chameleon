import { useNavigate } from "react-router-dom";
import { Palette, ArrowLeft } from "lucide-react";
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
import { ArchivedPaletteCard } from "@/components/ArchivedPaletteCard";
import { useArchivedPalettes } from "@/hooks/usePalettes";
import { useDesignMode } from "@/hooks/useDesignMode";

export function ArchivedPalettesList() {
  const { palettes, loading, restore, remove } = useArchivedPalettes();
  const navigate = useNavigate();
  const { mode } = useDesignMode();

  return (
    <div className="space-y-6">
      {mode === "boring" ? (
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/?tab=palettes")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold">Archived Palettes</h2>
          {!loading && palettes.length > 0 && (
            <Badge variant="secondary">{palettes.length}</Badge>
          )}
        </div>
      ) : (
        <>
          <PageHeader
            title="Archived Palettes"
            description="Restore or permanently delete archived palettes"
            onBack={() => navigate("/?tab=palettes")}
          />
          <Separator />
        </>
      )}

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
      ) : mode === "boring" ? (
        <GroupedList>
          {palettes.map((palette) => (
            <GroupedListItem key={palette.id} className="hover:bg-transparent">
              <ArchivedPaletteCard
                palette={palette}
                onRestore={restore}
                onDelete={remove}
              />
            </GroupedListItem>
          ))}
        </GroupedList>
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
