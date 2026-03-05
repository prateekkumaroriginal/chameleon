import type { Palette, PaletteVariant } from "@/types/palette";
import { PALETTES_STORAGE_KEY } from "@/config";
import { domainMatches } from "@/services/storageService";
import { generateId } from "@/lib/id";

async function getAllPalettes(): Promise<Palette[]> {
  const result = await chrome.storage.local.get(PALETTES_STORAGE_KEY);
  return (result[PALETTES_STORAGE_KEY] as Palette[] | undefined) ?? [];
}

async function setAllPalettes(palettes: Palette[]): Promise<void> {
  await chrome.storage.local.set({ [PALETTES_STORAGE_KEY]: palettes });
}

export async function getPalettes(): Promise<Palette[]> {
  const all = await getAllPalettes();
  return all.filter((p) => !p.isArchived);
}

export async function getArchivedPalettes(): Promise<Palette[]> {
  const all = await getAllPalettes();
  return all.filter((p) => p.isArchived);
}

export async function getPalettesByDomain(domain: string): Promise<Palette[]> {
  const palettes = await getPalettes();
  return palettes.filter((p) => domainMatches(domain, p.domain));
}

export async function getPaletteById(id: string): Promise<Palette | undefined> {
  const all = await getAllPalettes();
  return all.find((p) => p.id === id);
}

export async function savePalette(
  data: Omit<Palette, "id" | "createdAt" | "updatedAt" | "isArchived">
): Promise<Palette> {
  const all = await getAllPalettes();
  const now = Date.now();
  const newPalette: Palette = {
    ...data,
    id: generateId(),
    variants: data.variants.map((v) => ({
      ...v,
      id: v.id || generateId(),
    })),
    isArchived: false,
    createdAt: now,
    updatedAt: now,
  };
  all.push(newPalette);
  await setAllPalettes(all);
  return newPalette;
}

export async function updatePalette(
  id: string,
  updates: Partial<Pick<Palette, "name" | "domain" | "enabled" | "activeVariantId" | "variants">>
): Promise<Palette | undefined> {
  const all = await getAllPalettes();
  const index = all.findIndex((p) => p.id === id);
  if (index === -1) return undefined;

  // If variants are being updated, ensure each has an ID
  if (updates.variants) {
    updates.variants = updates.variants.map((v) => ({
      ...v,
      id: v.id || generateId(),
    }));
  }

  all[index] = {
    ...all[index],
    ...updates,
    updatedAt: Date.now(),
  };
  await setAllPalettes(all);
  return all[index];
}

export async function setActiveVariant(
  id: string,
  variantId: string
): Promise<Palette | undefined> {
  return updatePalette(id, { activeVariantId: variantId });
}

export async function togglePalette(
  id: string,
  enabled: boolean
): Promise<Palette | undefined> {
  return updatePalette(id, { enabled });
}

export async function archivePalette(id: string): Promise<void> {
  const all = await getAllPalettes();
  const index = all.findIndex((p) => p.id === id);
  if (index === -1) return;

  all[index] = {
    ...all[index],
    isArchived: true,
    enabled: false,
    updatedAt: Date.now(),
  };
  await setAllPalettes(all);
}

export async function restorePalette(id: string): Promise<void> {
  const all = await getAllPalettes();
  const index = all.findIndex((p) => p.id === id);
  if (index === -1) return;

  all[index] = {
    ...all[index],
    isArchived: false,
    enabled: false,
    updatedAt: Date.now(),
  };
  await setAllPalettes(all);
}

export async function deletePalette(id: string): Promise<void> {
  const all = await getAllPalettes();
  const filtered = all.filter((p) => p.id !== id);
  await setAllPalettes(filtered);
}

/** Helper to create empty variant stubs for new palettes */
export function createEmptyVariant(name: string = ""): PaletteVariant {
  return {
    id: generateId(),
    name,
    css: "",
  };
}
