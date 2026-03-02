import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { EditorHeader } from "@/options/components/EditorHeader";
import { RuleForm } from "@/options/components/RuleForm";
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
      <EditorHeader
        isNew={isNew}
        saving={saving}
        canSave={!!name.trim() && !!domain.trim()}
        onBack={() => navigate("/")}
        onSave={handleSave}
        onArchive={isNew ? undefined : handleArchive}
      />

      <Separator />

      {/* Form */}
      <RuleForm
        name={name}
        domain={domain}
        cssText={cssText}
        enabled={enabled}
        onNameChange={setName}
        onDomainChange={setDomain}
        onCssChange={setCssText}
        onEnabledChange={setEnabled}
      />
    </div>
  );
}
