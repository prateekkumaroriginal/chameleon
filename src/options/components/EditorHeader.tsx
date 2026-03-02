import { Save, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";

interface EditorHeaderProps {
  isNew: boolean;
  saving: boolean;
  canSave: boolean;
  onBack: () => void;
  onSave: () => void;
  onArchive?: () => void;
}

export function EditorHeader({
  isNew,
  saving,
  canSave,
  onBack,
  onSave,
  onArchive,
}: EditorHeaderProps) {
  return (
    <PageHeader
      title={isNew ? "New Rule" : "Edit Rule"}
      onBack={onBack}
      actions={
        <>
          {!isNew && onArchive && (
            <Button variant="outline" onClick={onArchive}>
              <Archive className="h-4 w-4 mr-2" />
              Archive
            </Button>
          )}
          <Button onClick={onSave} disabled={saving || !canSave}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving…" : "Save"}
          </Button>
        </>
      }
    />
  );
}
