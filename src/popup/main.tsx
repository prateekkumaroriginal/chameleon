import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Popup } from "./Popup";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TooltipProvider>
      <Popup />
    </TooltipProvider>
  </StrictMode>
);
