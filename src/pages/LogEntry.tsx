import { useState } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UtensilsCrossed, Scale, Droplets } from "lucide-react";
import { LogMealSheet } from "@/components/log/LogMealSheet";
import { LogWeightSheet } from "@/components/log/LogWeightSheet";
import { LogWaterSheet } from "@/components/log/LogWaterSheet";

type LogType = "meal" | "weight" | "water" | null;

const LogEntry = () => {
  const [openSheet, setOpenSheet] = useState<LogType>(null);

  const logOptions = [
    { 
      icon: UtensilsCrossed, 
      label: "Log Meal", 
      description: "Add food to your daily log",
      type: "meal" as const,
    },
    { 
      icon: Scale, 
      label: "Log Weight", 
      description: "Record your current weight",
      type: "weight" as const,
    },
    { 
      icon: Droplets, 
      label: "Log Water", 
      description: "Track your hydration",
      type: "water" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center px-4 py-4 h-16 bg-background border-b border-border/30">
        <h1 className="text-xl font-semibold text-foreground">Quick Log</h1>
      </header>

      <ScrollArea className="h-[calc(100vh-64px-80px)]">
        <div className="p-4 space-y-4">
          <p className="text-muted-foreground text-sm">What would you like to log?</p>
          
          {logOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => setOpenSheet(option.type)}
              className="w-full h-20 flex items-center justify-start gap-4 p-4 bg-card border border-border/30 rounded-xl hover:bg-accent transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <option.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <span className="text-base font-semibold text-foreground">{option.label}</span>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>

      {/* Bottom Sheets */}
      <LogMealSheet open={openSheet === "meal"} onOpenChange={(open) => !open && setOpenSheet(null)} />
      <LogWeightSheet open={openSheet === "weight"} onOpenChange={(open) => !open && setOpenSheet(null)} />
      <LogWaterSheet open={openSheet === "water"} onOpenChange={(open) => !open && setOpenSheet(null)} />

      <BottomNav />
    </div>
  );
};

export default LogEntry;
