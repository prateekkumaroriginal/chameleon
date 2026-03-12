import { Routes, Route } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { APP_NAME, APP_TAGLINE } from "@/config";
import { HomePage } from "./pages/HomePage";
import { RuleEditor } from "./pages/RuleEditor";
import { ArchivedList } from "./pages/ArchivedList";
import { PaletteEditor } from "./pages/PaletteEditor";
import { ArchivedPalettesList } from "./pages/ArchivedPalettesList";
import iconUrl from "@/assets/icon-48.png";

export function Options() {
  return (
    <div className="relative min-h-screen px-4 py-4 text-foreground md:px-6 md:py-6">
      <div className="app-shell grain-overlay relative mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-6xl flex-col rounded-[2rem]">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-background/55 backdrop-blur-xl">
          <div className="mx-auto flex items-center justify-between gap-4 px-6 py-5 md:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.4rem] border border-white/10 bg-white/8 shadow-[0_18px_36px_color-mix(in_oklab,var(--primary)_18%,transparent)] backdrop-blur-sm">
                <img src={iconUrl} alt="Chameleon Logo" className="h-8 w-8 object-contain" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="editorial-kicker text-[0.68rem] font-semibold uppercase">Themeable extension studio</span>
                <div className="flex flex-col gap-1">
                  <h1 className="font-serif text-3xl font-semibold leading-none md:text-4xl">{APP_NAME}</h1>
                  <p className="max-w-2xl text-sm leading-6 text-muted-foreground md:text-[0.95rem]">
                    {APP_TAGLINE} Build restrained style injections and palette variants with a cleaner light and dark workspace.
                  </p>
                </div>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 md:px-8 md:py-8">
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
    </div>
  );
}
