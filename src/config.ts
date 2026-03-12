export const STORAGE_KEY = "chameleon_rules";
export const PALETTES_STORAGE_KEY = "chameleon_palettes";
export const THEME_STORAGE_KEY = "chameleon_theme";

export const APP_NAME = "Chameleon";
export const APP_TAGLINE = "Shape every site with restrained, targeted CSS.";

export const POPUP_WIDTH = 360;
export const POPUP_MIN_HEIGHT = 200;

export const STYLE_ID_PREFIX = "chameleon-style-";
export const PALETTE_STYLE_PREFIX = "chameleon-palette-";

export const DEFAULT_THEME = "dark" as const;

export const THEME_OPTIONS = {
  light: "light",
  dark: "dark",
} as const;

export type AppTheme = (typeof THEME_OPTIONS)[keyof typeof THEME_OPTIONS];
