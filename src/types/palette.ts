export interface PaletteVariant {
  id: string;
  name: string;
  css: string;
}

export interface Palette {
  id: string;
  name: string;
  domain: string;
  enabled: boolean;
  activeVariantId: string | null;
  variants: PaletteVariant[];
  isArchived: boolean;
  createdAt: number;
  updatedAt: number;
}
