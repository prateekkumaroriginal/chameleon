import { useState, useEffect, useCallback } from "react";
import type { CSSRule } from "@/types/rule";
import * as storage from "@/services/storageService";

interface UseRulesReturn {
  rules: CSSRule[];
  loading: boolean;
  refresh: () => Promise<void>;
  toggle: (id: string, enabled: boolean) => Promise<void>;
  save: (rule: Omit<CSSRule, "id" | "createdAt" | "updatedAt" | "isArchived">) => Promise<CSSRule>;
  update: (id: string, updates: Partial<Pick<CSSRule, "name" | "domain" | "css" | "enabled">>) => Promise<void>;
  archive: (id: string) => Promise<void>;
}

export function useRules(): UseRulesReturn {
  const [rules, setRules] = useState<CSSRule[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const data = await storage.getRules();
    setRules(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const toggle = useCallback(async (id: string, enabled: boolean) => {
    await storage.toggleRule(id, enabled);
    await refresh();
  }, [refresh]);

  const save = useCallback(async (rule: Omit<CSSRule, "id" | "createdAt" | "updatedAt" | "isArchived">) => {
    const newRule = await storage.saveRule(rule);
    await refresh();
    return newRule;
  }, [refresh]);

  const update = useCallback(async (id: string, updates: Partial<Pick<CSSRule, "name" | "domain" | "css" | "enabled">>) => {
    await storage.updateRule(id, updates);
    await refresh();
  }, [refresh]);

  const archive = useCallback(async (id: string) => {
    await storage.archiveRule(id);
    await refresh();
  }, [refresh]);

  return { rules, loading, refresh, toggle, save, update, archive };
}

interface UseArchivedRulesReturn {
  rules: CSSRule[];
  loading: boolean;
  refresh: () => Promise<void>;
  restore: (id: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export function useArchivedRules(): UseArchivedRulesReturn {
  const [rules, setRules] = useState<CSSRule[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const data = await storage.getArchivedRules();
    setRules(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const restore = useCallback(async (id: string) => {
    await storage.restoreRule(id);
    await refresh();
  }, [refresh]);

  const remove = useCallback(async (id: string) => {
    await storage.deleteRule(id);
    await refresh();
  }, [refresh]);

  return { rules, loading, refresh, restore, remove };
}
