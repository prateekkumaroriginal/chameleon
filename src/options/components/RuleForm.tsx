import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CSSEditor } from "@/components/CSSEditor";

interface RuleFormProps {
  name: string;
  domain: string;
  cssText: string;
  enabled: boolean;
  onNameChange: (value: string) => void;
  onDomainChange: (value: string) => void;
  onCssChange: (value: string) => void;
  onEnabledChange: (value: boolean) => void;
}

export function RuleForm({
  name,
  domain,
  cssText,
  enabled,
  onNameChange,
  onDomainChange,
  onCssChange,
  onEnabledChange,
}: RuleFormProps) {
  return (
    <div className="grid gap-6">
      {/* Name */}
      <div className="space-y-2">
        <label htmlFor="rule-name" className="text-sm font-medium">
          Name
        </label>
        <Input
          id="rule-name"
          placeholder="e.g. Dark mode for GitHub"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
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
          onChange={(e) => onDomainChange(e.target.value)}
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
          onCheckedChange={onEnabledChange}
        />
      </div>

      {/* CSS Editor */}
      <div className="space-y-2">
        <label className="text-sm font-medium">CSS</label>
        <CSSEditor
          value={cssText}
          onChange={onCssChange}
          className="min-h-[300px]"
        />
      </div>
    </div>
  );
}
