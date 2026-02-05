import { BottomNav } from "@/components/layout/BottomNav";
import { ScrollArea } from "@/components/ui/scroll-area";

const Progress = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center px-4 py-4 h-16 bg-background border-b border-border/30">
        <h1 className="text-xl font-semibold text-foreground">Progress</h1>
      </header>

      <ScrollArea className="h-[calc(100vh-64px-80px)]">
        <div className="flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
          <span className="text-5xl mb-4">📊</span>
          <h2 className="text-xl font-semibold text-foreground">Your Progress</h2>
          <p className="text-muted-foreground mt-2 max-w-xs">
            Track your weight trends, body photos, and macro adherence over time.
          </p>
        </div>
      </ScrollArea>

      <BottomNav />
    </div>
  );
};

export default Progress;
