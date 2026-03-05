// Chameleon Content Script

import {
  STORAGE_KEY,
  PALETTES_STORAGE_KEY,
  STYLE_ID_PREFIX,
  PALETTE_STYLE_PREFIX
} from "@/config";
import type { Palette } from "@/types/palette";

interface CSSRuleData {
  id: string;
  name: string;
  domain: string;
  css: string;
  enabled: boolean;
  isArchived: boolean;
  createdAt: number;
  updatedAt: number;
}

function extractHostname(input: string): string {
  let cleaned = input.trim();
  if (cleaned.includes("://")) {
    try {
      return new URL(cleaned).hostname;
    } catch {
      cleaned = cleaned.split("://")[1] ?? cleaned;
    }
  }
  cleaned = cleaned.split("/")[0];
  cleaned = cleaned.split("?")[0];
  cleaned = cleaned.split("#")[0];
  return cleaned;
}

function domainMatches(tabHostname: string, ruleDomain: string): boolean {
  if (ruleDomain === "*") return true;
  const ruleHost = extractHostname(ruleDomain);
  return tabHostname === ruleHost || tabHostname.endsWith("." + ruleHost);
}

function getStyleId(ruleId: string): string {
  return `${STYLE_ID_PREFIX}${ruleId}`;
}

function getPaletteStyleId(paletteId: string): string {
  return `${PALETTE_STYLE_PREFIX}${paletteId}`;
}

function injectStyle(styleId: string, css: string): void {
  removeStyle(styleId);
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = css;
  document.head.appendChild(style);
}

function removeStyle(styleId: string): void {
  const el = document.getElementById(styleId);
  if (el) el.remove();
}

function injectRule(rule: CSSRuleData): void {
  injectStyle(getStyleId(rule.id), rule.css);
}

function removeRule(ruleId: string): void {
  removeStyle(getStyleId(ruleId));
}

async function applyRules(): Promise<void> {
  const result = await chrome.storage.local.get(STORAGE_KEY);
  const rules: CSSRuleData[] =
    (result[STORAGE_KEY] as CSSRuleData[] | undefined) ?? [];
  const hostname = location.hostname;

  for (const rule of rules) {
    if (domainMatches(hostname, rule.domain) && rule.enabled && !rule.isArchived) {
      injectRule(rule);
    } else {
      removeRule(rule.id);
    }
  }
}

async function applyPalettes(): Promise<void> {
  const result = await chrome.storage.local.get(PALETTES_STORAGE_KEY);
  const palettes: Palette[] =
    (result[PALETTES_STORAGE_KEY] as Palette[] | undefined) ?? [];
  const hostname = location.hostname;

  for (const palette of palettes) {
    const styleId = getPaletteStyleId(palette.id);
    if (
      domainMatches(hostname, palette.domain) &&
      palette.enabled &&
      !palette.isArchived &&
      palette.activeVariantId
    ) {
      const activeVariant = palette.variants.find(
        (v) => v.id === palette.activeVariantId
      );
      if (activeVariant) {
        injectStyle(styleId, activeVariant.css);
      } else {
        removeStyle(styleId);
      }
    } else {
      removeStyle(styleId);
    }
  }
}

// Initial application
applyRules();
applyPalettes();

// Listen for storage changes to react in real-time
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local") {
    if (changes[STORAGE_KEY]) {
      applyRules();
    }
    if (changes[PALETTES_STORAGE_KEY]) {
      applyPalettes();
    }
  }
});