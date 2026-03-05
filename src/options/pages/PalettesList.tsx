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
import { PaletteCard } from "@/components/PaletteCard";
import { usePalettes } from "@/hooks/usePalettes";

export function PalettesList() {
  const { palettes, loading, toggle } = usePalettes();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Palettes"
        description="Manage your CSS palettes with swappable variants"
        actions={
          <>
            <Button variant="outline" onClick={() => navigate("/palettes/archived")}>
              <Archive className="h-4 w-4 mr-2" />
              Archived
            </Button>
            <Button onClick={() => navigate("/palettes/new")}>
              <Plus className="h-4 w-4 mr-2" />
              New Palette
            </Button>
          </>
        }
      />

      <Separator />

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground animate-pulse">Loading palettes…</p>
        </div>
      ) : palettes.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Palette />
            </EmptyMedia>
            <EmptyTitle>No palettes yet</EmptyTitle>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={() => navigate("/palettes/new")} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Create your first palette
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="space-y-2">
          {palettes.map((palette) => (
            <PaletteCard
              key={palette.id}
              palette={palette}
              onToggle={toggle}
              onClick={() => navigate(`/palettes/edit/${palette.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
