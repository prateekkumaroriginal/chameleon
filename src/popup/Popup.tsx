import { useState, useEffect, useCallback } from "react";
import { Braces, Palette } from "lucide-react";
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
    if (!domain) {
      return;
    }

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
      void fetchData();
    } else if (!domainLoading) {
      setLoading(false);
    }
  }, [domain, domainLoading, fetchData]);

  const handleToggle = async (id: string, enabled: boolean) => {
    await storage.toggleRule(id, enabled);
    setRules((prev) => prev.map((rule) => (rule.id === id ? { ...rule, enabled } : rule)));
  };

  const handlePaletteToggle = async (id: string, enabled: boolean) => {
    await paletteStorage.togglePalette(id, enabled);
    setPalettes((prev) => prev.map((palette) => (palette.id === id ? { ...palette, enabled } : palette)));
  };

  const handleSelectVariant = async (id: string, variantId: string) => {
    await paletteStorage.setActiveVariant(id, variantId);
    setPalettes((prev) =>
      prev.map((palette) =>
        palette.id === id ? { ...palette, activeVariantId: variantId } : palette
      )
    );
  };

  const openOptionsPage = () => {
    chrome.runtime.openOptionsPage();
  };

  const isLoading = domainLoading || loading;
  const hasContent = rules.length > 0 || palettes.length > 0;

  return (
    <div
      style={{ width: POPUP_WIDTH, minHeight: POPUP_MIN_HEIGHT }}
      className="app-shell grain-overlay relative overflow-hidden rounded-[1.75rem] text-foreground"
    >
      <PopupHeader onOpenSettings={openOptionsPage} />

      <div className="flex flex-col gap-3 px-4 pt-4">
        <div className="flex items-center justify-between gap-3 rounded-[1.25rem] border border-white/10 bg-white/6 px-3 py-2.5 backdrop-blur-sm">
          <div className="flex min-w-0 flex-col gap-1">
            <span className="section-label">Current site</span>
            {domain ? (
              <Badge variant="outline" className="max-w-full justify-start overflow-hidden text-ellipsis whitespace-nowrap rounded-full border-primary/20 bg-primary/10 font-mono normal-case tracking-[0.08em] text-primary">
                {domain}
              </Badge>
            ) : (
              <span className="text-xs text-muted-foreground">Open a normal webpage to inspect site-specific styles.</span>
            )}
          </div>
          <Badge variant="secondary" className="rounded-full bg-secondary/90 text-[0.65rem] tracking-[0.18em]">
            Live
          </Badge>
        </div>
      </div>

      <ScrollArea className="max-h-[420px] w-full overflow-x-hidden">
        <div className="flex flex-col gap-4 px-4 py-4">
          {isLoading ? (
            <div className="surface-card flex items-center justify-center rounded-[1.4rem] border border-white/10 px-4 py-10">
              <div className="animate-pulse text-sm text-muted-foreground">Loading styles...</div>
            </div>
          ) : !hasContent ? (
            <Empty className="py-12">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Braces />
                </EmptyMedia>
                <EmptyTitle>No active rules for this site</EmptyTitle>
              </EmptyHeader>
              <EmptyContent>
                <p className="text-sm leading-6 text-muted-foreground">
                  Build a focused rule or palette from the full settings screen.
                </p>
                <Button variant="outline" size="sm" onClick={openOptionsPage}>
                  Create a rule
                </Button>
              </EmptyContent>
            </Empty>
          ) : (
            <>
              {rules.length > 0 && (
                <section className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-3 px-1">
                    <span className="section-label">Rules</span>
                    <Badge variant="secondary">{rules.length}</Badge>
                  </div>
                  <div className="surface-card flex flex-col overflow-hidden rounded-[1.4rem] border border-white/10">
                    {rules.map((rule, index) => (
                      <PopupRuleItem
                        key={rule.id}
                        rule={rule}
                        onToggle={handleToggle}
                        showSeparator={index < rules.length - 1}
                      />
                    ))}
                  </div>
                </section>
              )}

              {palettes.length > 0 && (
                <section className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-3 px-1">
                    <div className="flex items-center gap-2">
                      <Palette className="h-3.5 w-3.5 text-primary" />
                      <span className="section-label">Palettes</span>
                    </div>
                    <Badge variant="secondary">{palettes.length}</Badge>
                  </div>
                  {rules.length > 0 && <Separator className="opacity-60" />}
                  <div className="surface-card flex flex-col overflow-hidden rounded-[1.4rem] border border-white/10">
                    {palettes.map((palette, index) => (
                      <PopupPaletteItem
                        key={palette.id}
                        palette={palette}
                        onToggle={handlePaletteToggle}
                        onSelectVariant={handleSelectVariant}
                        showSeparator={index < palettes.length - 1}
                      />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
