import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, Trash2, Save, Archive } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";
import { CSSEditor } from "@/components/CSSEditor";
import type { PaletteVariant } from "@/types/palette";
import * as paletteStorage from "@/services/paletteService";

export function PaletteEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id;

  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [variants, setVariants] = useState<PaletteVariant[]>([
    paletteStorage.createEmptyVariant("Variant 1"),
    paletteStorage.createEmptyVariant("Variant 2"),
  ]);
  const [activeVariantId, setActiveVariantId] = useState<string | null>(null);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const palette = await paletteStorage.getPaletteById(id);
      if (palette) {
        setName(palette.name);
        setDomain(palette.domain);
        setEnabled(palette.enabled);
        setVariants(palette.variants);
        setActiveVariantId(palette.activeVariantId);
      }
      setLoading(false);
    })();
  }, [id]);

  const handleSave = async () => {
    if (!name.trim() || !domain.trim() || variants.length < 2) return;
    setSaving(true);
    try {
      if (isNew) {
        const saved = await paletteStorage.savePalette({
          name: name.trim(),
          domain: domain.trim(),
          enabled,
          activeVariantId: activeVariantId || variants[0]?.id || null,
          variants,
        });
        // If no active variant was set, default to first
        if (!activeVariantId && saved.variants.length > 0) {
          await paletteStorage.setActiveVariant(saved.id, saved.variants[0].id);
        }
      } else {
        await paletteStorage.updatePalette(id!, {
          name: name.trim(),
          domain: domain.trim(),
          enabled,
          activeVariantId,
          variants,
        });
      }
      navigate("/?tab=palettes");
    } finally {
      setSaving(false);
    }
  };

  const handleArchive = async () => {
    if (!id) return;
    await paletteStorage.archivePalette(id);
    navigate("/?tab=palettes");
  };

  const addVariant = () => {
    const newVariant = paletteStorage.createEmptyVariant(`Variant ${variants.length + 1}`);
    setVariants([...variants, newVariant]);
  };

  const removeVariant = (variantId: string) => {
    if (variants.length <= 2) return; // Must have at least 2
    const updated = variants.filter((v) => v.id !== variantId);
    setVariants(updated);
    // If we removed the active variant, reset to first
    if (activeVariantId === variantId) {
      setActiveVariantId(updated[0]?.id || null);
    }
  };

  const updateVariantName = (variantId: string, newName: string) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === variantId ? { ...v, name: newName } : v))
    );
  };

  const updateVariantCss = (variantId: string, css: string) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === variantId ? { ...v, css } : v))
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground animate-pulse">Loading palette…</p>
      </div>
    );
  }

  const canSave = !!name.trim() && !!domain.trim() && variants.length >= 2;

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title={isNew ? "New Palette" : "Edit Palette"}
        onBack={() => navigate("/?tab=palettes")}
        actions={
          <>
            {!isNew && (
              <Button variant="outline" onClick={handleArchive}>
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </Button>
            )}
            <Button onClick={handleSave} disabled={saving || !canSave}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Saving…" : "Save"}
            </Button>
          </>
        }
      />

      <Separator />

      {/* Form fields */}
      <div className="grid gap-6">
        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="palette-name" className="text-sm font-medium">
            Name
          </label>
          <Input
            id="palette-name"
            placeholder="e.g. GitHub Theme"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Domain */}
        <div className="space-y-2">
          <label htmlFor="palette-domain" className="text-sm font-medium">
            Domain
          </label>
          <Input
            id="palette-domain"
            placeholder="e.g. github.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="font-mono"
          />
          <p className="text-xs text-muted-foreground">
            Use <code className="bg-muted px-1 rounded">*</code> to match all
            domains
          </p>
        </div>

        {/* Enabled */}
        <div className="flex items-center justify-between">
          <label htmlFor="palette-enabled" className="text-sm font-medium">
            Enabled
          </label>
          <Switch
            id="palette-enabled"
            checked={enabled}
            onCheckedChange={setEnabled}
          />
        </div>

        <Separator />

        {/* Variants */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Variants</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Each variant is a different style. Only one can be active at a time.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={addVariant}>
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              Add Variant
            </Button>
          </div>

          {variants.map((variant, index) => (
            <Card key={variant.id} className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <Input
                    placeholder={`Variant ${index + 1} name`}
                    value={variant.name}
                    onChange={(e) => updateVariantName(variant.id, e.target.value)}
                  />
                </div>
                {variants.length > 2 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeVariant(variant.id)}
                    className="text-muted-foreground hover:text-destructive shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <CSSEditor
                value={variant.css}
                onChange={(css) => updateVariantCss(variant.id, css)}
                className="min-h-[200px]"
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
