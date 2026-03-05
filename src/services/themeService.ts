import {
  DEFAULT_THEME,
  THEME_OPTIONS,
  THEME_STORAGE_KEY,
  type AppTheme,
} from "@/config";

function isAppTheme(value: unknown): value is AppTheme {
  return value === THEME_OPTIONS.light || value === THEME_OPTIONS.dark;
}

export async function getStoredTheme(): Promise<AppTheme> {
  const result = await chrome.storage.local.get(THEME_STORAGE_KEY);
  const theme = result[THEME_STORAGE_KEY];

  return isAppTheme(theme) ? theme : DEFAULT_THEME;
}

export async function setStoredTheme(theme: AppTheme): Promise<void> {
  await chrome.storage.local.set({ [THEME_STORAGE_KEY]: theme });
}
