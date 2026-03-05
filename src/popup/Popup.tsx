import { useState, useEffect, useCallback } from "react";
import { Braces } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyContent,
} from "@/components/ui/empty";
import { PopupHeader } from "@/popup/components/PopupHeader";
import { PopupRuleItem } from "@/popup/components/PopupRuleItem";
import { PopupPaletteItem } from "@/popup/components/PopupPaletteItem";
import { useCurrentDomain } from "@/hooks/useCurrentDomain";
import type { CSSRule } from "@/types/rule";
import type { Palette as PaletteType } from "@/types/palette";
import * as storage from "@/services/storageService";
import * as paletteStorage from "@/services/paletteService";
import { POPUP_WIDTH, POPUP_MIN_HEIGHT } from "@/config";

export function Popup() {
  const { domain, loading: domainLoading } = useCurrentDomain();
  const [rules, setRules] = useState<CSSRule[]>([]);
  const [palettes, setPalettes] = useState<PaletteType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!domain) return;
    setLoading(true);
    const [domainRules, domainPalettes] = await Promise.all([
      storage.getRulesByDomain(domain),
      paletteStorage.getPalettesByDomain(domain),
    ]);
    setRules(domainRules);
    setPalettes(domainPalettes);
    setLoading(false);
  }, [domain]);

  useEffect(() => {
    if (!domainLoading && domain) {
      fetchData();
    } else if (!domainLoading) {
      setLoading(false);
    }
  }, [domain, domainLoading, fetchData]);

  const handleToggle = async (id: string, enabled: boolean) => {
    await storage.toggleRule(id, enabled);
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled } : r))
    );
  };

  const handlePaletteToggle = async (id: string, enabled: boolean) => {
    await paletteStorage.togglePalette(id, enabled);
    setPalettes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled } : p))
    );
  };

  const handleSelectVariant = async (id: string, variantId: string) => {
    await paletteStorage.setActiveVariant(id, variantId);
    setPalettes((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, activeVariantId: variantId } : p
      )
    );
  };

  const openOptionsPage = () => {
    chrome.runtime.openOptionsPage();
  };

  const isLoading = domainLoading || loading;
  const hasContent = rules.length > 0 || palettes.length > 0;

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

      {/* Content */}
      <ScrollArea className="max-h-[400px] w-full overflow-x-hidden">
        <div className="p-4 space-y-2">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-pulse text-sm text-muted-foreground">
                Loading…
              </div>
            </div>
          ) : !hasContent ? (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Braces />
                </EmptyMedia>
                <EmptyTitle>No Rules/Palettes for this site</EmptyTitle>
              </EmptyHeader>
              <EmptyContent>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={openOptionsPage}
                >
                  Create a Rule
                </Button>
              </EmptyContent>
            </Empty>
          ) : (
            <>
              {/* Rules */}
              {rules.length > 0 && (
                <>
                  {rules.map((rule, index) => (
                    <PopupRuleItem
                      key={rule.id}
                      rule={rule}
                      onToggle={handleToggle}
                      showSeparator={index < rules.length - 1}
                    />
                  ))}
                </>
              )}

              {/* Palettes */}
              {palettes.length > 0 && (
                <>
                  {rules.length > 0 && (
                    <div className="pt-2">
                      <Separator />
                      <p className="text-xs text-muted-foreground font-medium pt-2 pb-1">
                        Palettes
                      </p>
                    </div>
                  )}
                  {palettes.map((palette, index) => (
                    <PopupPaletteItem
                      key={palette.id}
                      palette={palette}
                      onToggle={handlePaletteToggle}
                      onSelectVariant={handleSelectVariant}
                      showSeparator={index < palettes.length - 1}
                    />
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

