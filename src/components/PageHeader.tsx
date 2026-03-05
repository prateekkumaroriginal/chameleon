import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  description?: string;
  onBack?: () => void;
  actions?: ReactNode;
}

export function PageHeader({
  title,
  description,
  onBack,
  actions,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div className="flex items-start gap-3">
        {onBack && (
          <Button variant="outline" size="icon-sm" onClick={onBack} className="mt-1">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <div className="flex flex-col gap-2">
          <span className="section-label">Workspace</span>
          <div className="flex flex-col gap-1">
            <h2 className="font-serif text-3xl font-semibold tracking-tight">{title}</h2>
            {description && (
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
