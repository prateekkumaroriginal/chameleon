import type { CSSRule } from "@/types/rule";
import { STORAGE_KEY } from "@/config";
import { generateId } from "@/lib/id";

/**
 * Extracts just the hostname from a domain string that may contain
 * a protocol, path, or other URL parts.
 */
export function extractHostname(input: string): string {
  let cleaned = input.trim();
  // If it looks like a URL, parse it
  if (cleaned.includes("://")) {
    try {
      return new URL(cleaned).hostname;
    } catch {
      // strip protocol manually as fallback
      cleaned = cleaned.split("://")[1] ?? cleaned;
    }
  }
  // Remove any trailing path/query
  cleaned = cleaned.split("/")[0];
  cleaned = cleaned.split("?")[0];
  cleaned = cleaned.split("#")[0];
  return cleaned;
}


async function getAllRules(): Promise<CSSRule[]> {
  const result = await chrome.storage.local.get(STORAGE_KEY);
  return (result[STORAGE_KEY] as CSSRule[] | undefined) ?? [];
}

async function setAllRules(rules: CSSRule[]): Promise<void> {
  await chrome.storage.local.set({ [STORAGE_KEY]: rules });
}

export async function getRules(): Promise<CSSRule[]> {
  const all = await getAllRules();
  return all.filter((r) => !r.isArchived);
}

export async function getArchivedRules(): Promise<CSSRule[]> {
  const all = await getAllRules();
  return all.filter((r) => r.isArchived);
}

export function domainMatches(tabHostname: string, ruleDomain: string): boolean {
  if (ruleDomain === "*") return true;
  const ruleHost = extractHostname(ruleDomain);
  // Exact match or subdomain match (e.g. rule "example.com" matches "sub.example.com")
  return tabHostname === ruleHost || tabHostname.endsWith("." + ruleHost);
}

export async function getRulesByDomain(domain: string): Promise<CSSRule[]> {
  const rules = await getRules();
  return rules.filter((r) => domainMatches(domain, r.domain));
}

export async function getRuleById(id: string): Promise<CSSRule | undefined> {
  const all = await getAllRules();
  return all.find((r) => r.id === id);
}

export async function saveRule(
  rule: Omit<CSSRule, "id" | "createdAt" | "updatedAt" | "isArchived">
): Promise<CSSRule> {
  const all = await getAllRules();
  const now = Date.now();
  const newRule: CSSRule = {
    ...rule,
    id: generateId(),
    isArchived: false,
    createdAt: now,
    updatedAt: now,
  };
  all.push(newRule);
  await setAllRules(all);
  return newRule;
}

export async function updateRule(
  id: string,
  updates: Partial<Pick<CSSRule, "name" | "domain" | "css" | "enabled">>
): Promise<CSSRule | undefined> {
  const all = await getAllRules();
  const index = all.findIndex((r) => r.id === id);
  if (index === -1) return undefined;

  all[index] = {
    ...all[index],
    ...updates,
    updatedAt: Date.now(),
  };
  await setAllRules(all);
  return all[index];
}

export async function toggleRule(
  id: string,
  enabled: boolean
): Promise<CSSRule | undefined> {
  return updateRule(id, { enabled });
}

export async function archiveRule(id: string): Promise<void> {
  const all = await getAllRules();
  const index = all.findIndex((r) => r.id === id);
  if (index === -1) return;

  all[index] = {
    ...all[index],
    isArchived: true,
    updatedAt: Date.now(),
  };
  await setAllRules(all);
}

export async function restoreRule(id: string): Promise<void> {
  const all = await getAllRules();
  const index = all.findIndex((r) => r.id === id);
  if (index === -1) return;

  all[index] = {
    ...all[index],
    isArchived: false,
    enabled: false,
    updatedAt: Date.now(),
  };
  await setAllRules(all);
}

export async function deleteRule(id: string): Promise<void> {
  const all = await getAllRules();
  const filtered = all.filter((r) => r.id !== id);
  await setAllRules(filtered);
}
