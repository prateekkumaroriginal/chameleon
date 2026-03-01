import { useState, useEffect, useCallback } from "react";
import { Settings, Palette } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCurrentDomain } from "@/hooks/useCurrentDomain";
import type { CSSRule } from "@/types/rule";
import * as storage from "@/services/storageService";
import { APP_NAME, POPUP_WIDTH, POPUP_MIN_HEIGHT } from "@/config";

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
    <div style={{ width: POPUP_WIDTH, minHeight: POPUP_MIN_HEIGHT }} className="bg-background text-foreground">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          <h1 className="text-base font-semibold">{APP_NAME}</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={openOptionsPage}
          title="Open settings"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      {/* Domain badge */}
      {domain && (
        <div className="px-4 pt-3">
          <Badge variant="secondary" className="text-xs font-mono">
            {domain}
          </Badge>
        </div>
      )}

      {/* Rules */}
      <ScrollArea className="max-h-[400px]">
        <div className="p-4 space-y-2">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-pulse text-sm text-muted-foreground">
                Loading…
              </div>
            </div>
          ) : rules.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 gap-2 text-center">
              <Palette className="h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                No CSS rules for this site
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={openOptionsPage}
                className="mt-2"
              >
                Create a rule
              </Button>
            </div>
          ) : (
            rules.map((rule, index) => (
              <div key={rule.id}>
                <div className="flex items-center justify-between py-2">
                  <div className="flex-1 min-w-0 mr-3">
                    <p className="text-sm font-medium truncate">{rule.name}</p>
                    <p className="text-xs text-muted-foreground font-mono truncate">
                      {rule.domain}
                    </p>
                  </div>
                  <Switch
                    checked={rule.enabled}
                    onCheckedChange={(checked) =>
                      handleToggle(rule.id, checked)
                    }
                  />
                </div>
                {index < rules.length - 1 && <Separator />}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
