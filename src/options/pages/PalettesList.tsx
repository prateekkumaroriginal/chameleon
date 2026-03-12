import { useNavigate } from "react-router-dom";
import { Archive, Plus, Palette } from "lucide-react";
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
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Palettes"
        description="Bundle multi-variant CSS themes for a site and switch them without reopening the editor."
        actions={
          <>
            <Button variant="outline" onClick={() => navigate("/palettes/archived")}>
              <Archive className="h-4 w-4" />
              Archived
            </Button>
            <Button onClick={() => navigate("/palettes/new")}>
              <Plus className="h-4 w-4" />
              New Palette
            </Button>
          </>
        }
      />

      <Separator className="opacity-60" />

      {loading ? (
        <div className="surface-card flex items-center justify-center rounded-[1.5rem] border border-white/10 px-6 py-14">
          <p className="animate-pulse text-muted-foreground">Loading palettes...</p>
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
            <p className="text-sm leading-6 text-muted-foreground">
              Use palettes when one site needs a few distinct looks instead of one-off overrides.
            </p>
            <Button onClick={() => navigate("/palettes/new")} variant="outline">
              <Plus className="h-4 w-4" />
              Create your first palette
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="grid gap-3">
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
