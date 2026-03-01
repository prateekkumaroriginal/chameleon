import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { CSSEditor } from "@/components/CSSEditor";
import * as storage from "@/services/storageService";

export function RuleEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id;

  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [cssText, setCssText] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const rule = await storage.getRuleById(id);
      if (rule) {
        setName(rule.name);
        setDomain(rule.domain);
        setCssText(rule.css);
        setEnabled(rule.enabled);
      }
      setLoading(false);
    })();
  }, [id]);

  const handleSave = async () => {
    if (!name.trim() || !domain.trim()) return;
    setSaving(true);
    try {
      if (isNew) {
        await storage.saveRule({
          name: name.trim(),
          domain: domain.trim(),
          css: cssText,
          enabled,
        });
      } else {
        await storage.updateRule(id!, {
          name: name.trim(),
          domain: domain.trim(),
          css: cssText,
          enabled,
        });
      }
      navigate("/");
    } finally {
      setSaving(false);
    }
  };

  const handleArchive = async () => {
    if (!id) return;
    await storage.archiveRule(id);
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground animate-pulse">Loading rule…</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {isNew ? "New Rule" : "Edit Rule"}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isNew && (
            <Button variant="outline" onClick={handleArchive}>
              <Archive className="h-4 w-4 mr-2" />
              Archive
            </Button>
          )}
          <Button onClick={handleSave} disabled={saving || !name.trim() || !domain.trim()}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving…" : "Save"}
          </Button>
        </div>
      </div>

      <Separator />

      {/* Form */}
      <div className="grid gap-6 max-w-2xl">
        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="rule-name" className="text-sm font-medium">
            Name
          </label>
          <Input
            id="rule-name"
            placeholder="e.g. Dark mode for GitHub"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Domain */}
        <div className="space-y-2">
          <label htmlFor="rule-domain" className="text-sm font-medium">
            Domain
          </label>
          <Input
            id="rule-domain"
            placeholder="e.g. github.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="font-mono"
          />
          <p className="text-xs text-muted-foreground">
            Use <code className="bg-muted px-1 rounded">*</code> to match all
            domains
          </p>
        </div>

        {/* Enabled */}
        <div className="flex items-center justify-between">
          <label htmlFor="rule-enabled" className="text-sm font-medium">
            Enabled
          </label>
          <Switch
            id="rule-enabled"
            checked={enabled}
            onCheckedChange={setEnabled}
          />
        </div>

        {/* CSS Editor */}
        <div className="space-y-2">
          <label className="text-sm font-medium">CSS</label>
          <CSSEditor
            value={cssText}
            onChange={setCssText}
            className="min-h-[300px]"
          />
        </div>
      </div>
    </div>
  );
}
