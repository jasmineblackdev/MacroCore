import { useState } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WeightChart } from "@/components/progress/WeightChart";
import { MacroAdherence } from "@/components/progress/MacroAdherence";
import { BodyPhotos } from "@/components/progress/BodyPhotos";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const mockWeightData = [
  { date: "Jan 29", weight: 145.2 },
  { date: "Jan 30", weight: 144.8 },
  { date: "Jan 31", weight: 144.5 },
  { date: "Feb 1", weight: 144.0 },
  { date: "Feb 2", weight: 143.6 },
  { date: "Feb 3", weight: 143.2 },
  { date: "Feb 4", weight: 142.8 },
  { date: "Feb 5", weight: 142.6 },
];

const mockPhotos = [
  { id: "1", date: "Jan 15, 2026", imageUrl: "" },
  { id: "2", date: "Feb 1, 2026", imageUrl: "" },
];

const timeRanges = ["1W", "2W", "1M", "3M", "All"] as const;

const Progress = () => {
  const [selectedRange, setSelectedRange] = useState<typeof timeRanges[number]>("1W");

  const handleAddPhoto = () => {
    toast.info("Photo capture coming soon!", {
      description: "This feature will be available in a future update",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background border-b border-border/30">
        <div className="px-4 py-4">
          <h1 className="text-xl font-semibold text-foreground mb-3">Progress</h1>
          
          {/* Time Range Selector */}
          <div className="flex gap-2">
            {timeRanges.map((range) => (
              <button
                key={range}
                onClick={() => setSelectedRange(range)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                  selectedRange === range
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border/30 text-muted-foreground hover:text-foreground"
                )}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-120px-80px)]">
        <div className="p-4 space-y-4">
          {/* Weight Chart */}
          <WeightChart data={mockWeightData} />

          {/* Macro Adherence */}
          <MacroAdherence
            proteinDays={6}
            carbsDays={5}
            fatsDays={7}
            totalDays={7}
          />

          {/* Body Photos */}
          <BodyPhotos photos={mockPhotos} onAddPhoto={handleAddPhoto} />

          {/* Stats Summary */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-card border border-border/30">
              <span className="text-sm text-muted-foreground">Starting Weight</span>
              <p className="text-xl font-semibold text-foreground">145.2 lbs</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border/30">
              <span className="text-sm text-muted-foreground">Current Weight</span>
              <p className="text-xl font-semibold text-foreground">142.6 lbs</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border/30">
              <span className="text-sm text-muted-foreground">Total Lost</span>
              <p className="text-xl font-semibold text-protein-teal">-2.6 lbs</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border/30">
              <span className="text-sm text-muted-foreground">Avg/Week</span>
              <p className="text-xl font-semibold text-foreground">-1.3 lbs</p>
            </div>
          </div>
        </div>
      </ScrollArea>

      <BottomNav />
    </div>
  );
};

export default Progress;
