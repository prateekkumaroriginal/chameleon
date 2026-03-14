import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "../index.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Options } from "./Options";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <HashRouter>
        <Options />
      </HashRouter>
    </ThemeProvider>
  </StrictMode>
);
