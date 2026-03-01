import { Routes, Route } from "react-router-dom";
import { Palette } from "lucide-react";
import { RulesList } from "./pages/RulesList";
import { RuleEditor } from "./pages/RuleEditor";
import { ArchivedList } from "./pages/ArchivedList";
import { APP_NAME } from "@/config";

export function Options() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto flex items-center gap-3 px-6 py-4">
          <Palette className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">{APP_NAME}</h1>
          <span className="text-sm text-muted-foreground">Options</span>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-6 max-w-4xl">
        <Routes>
          <Route path="/" element={<RulesList />} />
          <Route path="/new" element={<RuleEditor />} />
          <Route path="/edit/:id" element={<RuleEditor />} />
          <Route path="/archived" element={<ArchivedList />} />
        </Routes>
      </main>
    </div>
  );
}
