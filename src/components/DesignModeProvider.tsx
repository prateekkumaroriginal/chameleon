import type { ReactNode } from "react";
import { DesignModeContext, useDesignModeProvider } from "@/hooks/useDesignMode";

export function DesignModeProvider({ children }: { children: ReactNode }) {
  const value = useDesignModeProvider();
  return (
    <DesignModeContext value={value}>
      {children}
    </DesignModeContext>
  );
}
