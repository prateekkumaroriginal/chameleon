import { useSearchParams } from "react-router-dom";
import { Braces, Palette } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RulesList } from "./RulesList";
import { PalettesList } from "./PalettesList";

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "rules";

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="flex flex-col gap-6">
      <div className="surface-card flex items-center justify-center rounded-[1.5rem] border border-white/10 p-2">
        <TabsList className="w-full bg-transparent shadow-none md:w-auto">
          <TabsTrigger value="rules" className="gap-2 md:min-w-40">
            <Braces className="h-4 w-4" />
            Rules
          </TabsTrigger>
          <TabsTrigger value="palettes" className="gap-2 md:min-w-40">
            <Palette className="h-4 w-4" />
            Palettes
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="rules">
        <RulesList />
      </TabsContent>

      <TabsContent value="palettes">
        <PalettesList />
      </TabsContent>
    </Tabs>
  );
}
