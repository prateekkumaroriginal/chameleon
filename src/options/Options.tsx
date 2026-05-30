import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { RuleEditor } from "./pages/RuleEditor";
import { ArchivedList } from "./pages/ArchivedList";
import { PaletteEditor } from "./pages/PaletteEditor";
import { ArchivedPalettesList } from "./pages/ArchivedPalettesList";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useDesignMode } from "@/hooks/useDesignMode";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/config";
import iconUrl from "@/assets/icon-48.png";

export function Options() {
  const { mode } = useDesignMode();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
        <div className="mx-auto flex items-center gap-3 px-6 py-4">
          <img src={iconUrl} alt="Chameleon Logo" className="h-6 w-6 object-contain" />
          <h1 className="text-xl font-bold">{APP_NAME}</h1>
          <div className="flex-1" />
          <ThemeToggle />
        </div>
      </header>

      {/* Content */}
      <main className={cn(
        "mx-auto py-6",
        mode === "awesome" && "max-w-4xl px-6",
        mode === "boring" && "max-w-5xl px-8"
      )}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<RuleEditor />} />
          <Route path="/edit/:id" element={<RuleEditor />} />
          <Route path="/archived" element={<ArchivedList />} />
          <Route path="/palettes/new" element={<PaletteEditor />} />
          <Route path="/palettes/edit/:id" element={<PaletteEditor />} />
          <Route path="/palettes/archived" element={<ArchivedPalettesList />} />
        </Routes>
      </main>
    </div>
  );
}
