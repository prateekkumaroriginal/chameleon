import { useSearchParams } from "react-router-dom";
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
    <Tabs value={activeTab} onValueChange={handleTabChange}>
      <TabsList className="w-full">
        <TabsTrigger value="rules" className="flex-1">
          Rules
        </TabsTrigger>
        <TabsTrigger value="palettes" className="flex-1">
          Palettes
        </TabsTrigger>
      </TabsList>

      <TabsContent value="rules">
        <RulesList />
      </TabsContent>

      <TabsContent value="palettes">
        <PalettesList />
      </TabsContent>
    </Tabs>
  );
}
