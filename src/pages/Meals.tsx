import { BottomNav } from "@/components/layout/BottomNav";
import { ScrollArea } from "@/components/ui/scroll-area";

const Meals = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center px-4 py-4 h-16 bg-background border-b border-border/30">
        <h1 className="text-xl font-semibold text-foreground">Meals</h1>
      </header>

      <ScrollArea className="h-[calc(100vh-64px-80px)]">
        <div className="flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
          <span className="text-5xl mb-4">🍽️</span>
          <h2 className="text-xl font-semibold text-foreground">Meal Browser</h2>
          <p className="text-muted-foreground mt-2 max-w-xs">
            Browse 100+ meals filtered by your diet preferences and macro goals.
          </p>
        </div>
      </ScrollArea>

      <BottomNav />
    </div>
  );
};

export default Meals;
