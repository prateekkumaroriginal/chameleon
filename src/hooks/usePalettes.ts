import { useState, useEffect, useCallback } from "react";
import type { Palette } from "@/types/palette";
import * as paletteStorage from "@/services/paletteService";

interface UsePalettesReturn {
  palettes: Palette[];
  loading: boolean;
  refresh: () => Promise<void>;
  toggle: (id: string, enabled: boolean) => Promise<void>;
  setActiveVariant: (id: string, variantId: string) => Promise<void>;
  save: (palette: Omit<Palette, "id" | "createdAt" | "updatedAt" | "isArchived">) => Promise<Palette>;
  update: (id: string, updates: Partial<Pick<Palette, "name" | "domain" | "enabled" | "activeVariantId" | "variants">>) => Promise<void>;
  archive: (id: string) => Promise<void>;
}

export function usePalettes(): UsePalettesReturn {
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const data = await paletteStorage.getPalettes();
    setPalettes(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const toggle = useCallback(async (id: string, enabled: boolean) => {
    setPalettes((prev) => prev.map((p) => (p.id === id ? { ...p, enabled } : p)));
    await paletteStorage.togglePalette(id, enabled);
  }, []);

  const setActiveVariant = useCallback(async (id: string, variantId: string) => {
    await paletteStorage.setActiveVariant(id, variantId);
    await refresh();
  }, [refresh]);

  const save = useCallback(async (palette: Omit<Palette, "id" | "createdAt" | "updatedAt" | "isArchived">) => {
    const newPalette = await paletteStorage.savePalette(palette);
    await refresh();
    return newPalette;
  }, [refresh]);

  const update = useCallback(async (id: string, updates: Partial<Pick<Palette, "name" | "domain" | "enabled" | "activeVariantId" | "variants">>) => {
    await paletteStorage.updatePalette(id, updates);
    await refresh();
  }, [refresh]);

  const archive = useCallback(async (id: string) => {
    await paletteStorage.archivePalette(id);
    await refresh();
  }, [refresh]);

  return { palettes, loading, refresh, toggle, setActiveVariant, save, update, archive };
}

interface UseArchivedPalettesReturn {
  palettes: Palette[];
  loading: boolean;
  refresh: () => Promise<void>;
  restore: (id: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export function useArchivedPalettes(): UseArchivedPalettesReturn {
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const data = await paletteStorage.getArchivedPalettes();
    setPalettes(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const restore = useCallback(async (id: string) => {
    await paletteStorage.restorePalette(id);
    await refresh();
  }, [refresh]);

  const remove = useCallback(async (id: string) => {
    await paletteStorage.deletePalette(id);
    await refresh();
  }, [refresh]);

  return { palettes, loading, refresh, restore, remove };
}