import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DesignModeProvider } from "@/components/DesignModeProvider";
import { Popup } from "./Popup";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <DesignModeProvider>
        <TooltipProvider>
          <Popup />
        </TooltipProvider>
      </DesignModeProvider>
    </ThemeProvider>
  </StrictMode>
);
