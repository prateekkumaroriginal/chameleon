import { useState, useEffect, useCallback } from "react";
import { Palette } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyContent,
} from "@/components/ui/empty";
import { PopupHeader } from "@/popup/components/PopupHeader";
import { PopupRuleItem } from "@/popup/components/PopupRuleItem";
import { useCurrentDomain } from "@/hooks/useCurrentDomain";
import type { CSSRule } from "@/types/rule";
import * as storage from "@/services/storageService";
import { POPUP_WIDTH, POPUP_MIN_HEIGHT } from "@/config";

export function Popup() {
  const { domain, loading: domainLoading } = useCurrentDomain();
  const [rules, setRules] = useState<CSSRule[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRules = useCallback(async () => {
    if (!domain) return;
    setLoading(true);
    const domainRules = await storage.getRulesByDomain(domain);
    setRules(domainRules);
    setLoading(false);
  }, [domain]);

  useEffect(() => {
    if (!domainLoading && domain) {
      fetchRules();
    } else if (!domainLoading) {
      setLoading(false);
    }
  }, [domain, domainLoading, fetchRules]);

  const handleToggle = async (id: string, enabled: boolean) => {
    await storage.toggleRule(id, enabled);
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled } : r))
    );
  };

  const openOptionsPage = () => {
    chrome.runtime.openOptionsPage();
  };

  const isLoading = domainLoading || loading;

  return (
    <div style={{ width: POPUP_WIDTH, minHeight: POPUP_MIN_HEIGHT }} className="bg-background text-foreground overflow-hidden">
      {/* Header */}
      <PopupHeader onOpenSettings={openOptionsPage} />

      {/* Domain badge */}
      {domain && (
        <div className="px-4 pt-3">
          <Badge variant="secondary" className="text-xs font-mono">
            {domain}
          </Badge>
        </div>
      )}

      {/* Rules */}
      <ScrollArea className="max-h-[400px] w-full overflow-x-hidden">
        <div className="p-4 space-y-2">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-pulse text-sm text-muted-foreground">
                Loading…
              </div>
            </div>
          ) : rules.length === 0 ? (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Palette />
                </EmptyMedia>
                <EmptyTitle>No CSS rules for this site</EmptyTitle>
              </EmptyHeader>
              <EmptyContent>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={openOptionsPage}
                >
                  Create a rule
                </Button>
              </EmptyContent>
            </Empty>
          ) : (
            rules.map((rule, index) => (
              <PopupRuleItem
                key={rule.id}
                rule={rule}
                onToggle={handleToggle}
                showSeparator={index < rules.length - 1}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
