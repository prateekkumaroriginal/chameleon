import { Routes, Route } from "react-router-dom";
import { Palette } from "lucide-react";
import { RulesList } from "./pages/RulesList";
import { RuleEditor } from "./pages/RuleEditor";
import { ArchivedList } from "./pages/ArchivedList";
import { APP_NAME } from "@/config";
import Design2 from "./designs/Design2";
import Design4 from "./designs/Design4";
import Design6 from "./designs/Design6";
import Design9 from "./designs/Design9";
import Design10 from "./designs/Design10";
import { DesignNavigator } from "./components/DesignNavigator";

function DefaultLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
        <div className="mx-auto flex items-center gap-3 px-6 py-4">
          <Palette className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">{APP_NAME}</h1>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto px-6 py-6 max-w-4xl">
        <Routes>
          <Route path="/" element={<RulesList />} />
          <Route path="new" element={<RuleEditor />} />
          <Route path="edit/:id" element={<RuleEditor />} />
          <Route path="archived" element={<ArchivedList />} />
        </Routes>
      </main>
    </div>
  );
}

export function Options() {
  return (
    <>
      <DesignNavigator />
      <Routes>
        <Route path="1/*" element={<Design2 />} />
        <Route path="2/*" element={<Design4 />} />
        <Route path="3/*" element={<Design6 />} />
        <Route path="4/*" element={<Design9 />} />
        <Route path="5/*" element={<Design10 />} />
        <Route path="*" element={<DefaultLayout />} />
      </Routes>
    </>
  );
}
