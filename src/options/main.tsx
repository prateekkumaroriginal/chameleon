import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "../index.css";
import { Options } from "./Options";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Options />
    </HashRouter>
  </StrictMode>
);
