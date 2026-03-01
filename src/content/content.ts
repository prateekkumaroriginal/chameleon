// Chameleon Content Script

import { STORAGE_KEY, STYLE_ID_PREFIX } from "@/config";

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

function injectRule(rule: CSSRuleData): void {
  // Remove existing if present (to update CSS content)
  removeRule(rule.id);

  const style = document.createElement("style");
  style.id = getStyleId(rule.id);
  style.setAttribute("data-chameleon-id", rule.id);
  style.textContent = rule.css;
  document.head.appendChild(style);
}

function removeRule(ruleId: string): void {
  const el = document.getElementById(getStyleId(ruleId));
  if (el) el.remove();
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

// Initial application
applyRules();

// Listen for storage changes to react in real-time
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes[STORAGE_KEY]) {
    applyRules();
  }
});
