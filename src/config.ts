export const STORAGE_KEY = "chameleon_rules";
export const PALETTES_STORAGE_KEY = "chameleon_palettes";

export const APP_NAME = "Chameleon";

export const POPUP_WIDTH = 360;
export const POPUP_MIN_HEIGHT = 200;

export const THEME_STORAGE_KEY = "chameleon_theme";
export const THEME_PREFERENCES = ["system", "light", "dark"] as const;
export const THEME_SHOCKWAVE_DURATION_MS = 720;
export type ThemePreference = (typeof THEME_PREFERENCES)[number];
export type ResolvedTheme = "light" | "dark";

export const DESIGN_MODE_STORAGE_KEY = "chameleon_design_mode";
export const DESIGN_MODES = ["awesome", "boring"] as const;
export type DesignMode = (typeof DESIGN_MODES)[number];

export const STYLE_ID_PREFIX = "chameleon-style-";
export const PALETTE_STYLE_PREFIX = "chameleon-palette-";
