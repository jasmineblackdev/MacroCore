import { BottomNav } from "@/components/layout/BottomNav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, Scale, Droplets } from "lucide-react";

const LogEntry = () => {
  const logOptions = [
    { icon: UtensilsCrossed, label: "Log Meal", description: "Add food to your daily log" },
    { icon: Scale, label: "Log Weight", description: "Record your current weight" },
    { icon: Droplets, label: "Log Water", description: "Track your hydration" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center px-4 py-4 h-16 bg-background border-b border-border/30">
        <h1 className="text-xl font-semibold text-foreground">Quick Log</h1>
      </header>

      <ScrollArea className="h-[calc(100vh-64px-80px)]">
        <div className="p-4 space-y-4">
          <p className="text-muted-foreground text-sm">What would you like to log?</p>
          
          {logOptions.map((option, index) => (
            <Button
              key={option.label}
              variant="outline"
              className="w-full h-20 flex items-center justify-start gap-4 p-4 bg-card border-border/30 hover:bg-accent"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <option.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <span className="text-base font-semibold text-foreground">{option.label}</span>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>

      <BottomNav />
    </div>
  );
};

export default LogEntry;
