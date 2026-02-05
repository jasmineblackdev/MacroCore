import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Droplets, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogWaterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LogWaterSheet = ({ open, onOpenChange }: LogWaterSheetProps) => {
  const [glasses, setGlasses] = useState(0);
  const targetGlasses = 8;

  const handleSubmit = () => {
    toast.success(`Water logged: ${glasses} glasses`, {
      description: `${glasses}/${targetGlasses} glasses today`,
    });
    onOpenChange(false);
  };

  const percentage = Math.min((glasses / targetGlasses) * 100, 100);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Droplets className="w-5 h-5 text-primary" />
            </div>
            Log Water
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 pb-6">
          {/* Water Visual */}
          <div className="flex flex-col items-center py-4">
            {/* Circular Progress */}
            <div className="relative w-32 h-32">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-card"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${percentage * 3.52} 352`}
                  strokeLinecap="round"
                  className="text-primary transition-all duration-300"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl">💧</span>
                <span className="text-lg font-semibold text-foreground">{glasses}/{targetGlasses}</span>
              </div>
            </div>

            {/* Counter Controls */}
            <div className="flex items-center gap-6 mt-6">
              <button
                onClick={() => setGlasses(Math.max(0, glasses - 1))}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                  "bg-card border border-border/30 hover:bg-accent",
                  glasses === 0 && "opacity-50 cursor-not-allowed"
                )}
                disabled={glasses === 0}
              >
                <Minus className="w-5 h-5 text-foreground" />
              </button>
              
              <span className="text-4xl font-bold text-foreground w-16 text-center">
                {glasses}
              </span>
              
              <button
                onClick={() => setGlasses(glasses + 1)}
                className="w-12 h-12 rounded-full flex items-center justify-center bg-primary text-primary-foreground"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-muted-foreground mt-2">glasses (8 oz each)</p>
          </div>

          {/* Quick Add Buttons */}
          <div className="flex gap-2 justify-center">
            {[2, 4, 6, 8].map((num) => (
              <button
                key={num}
                onClick={() => setGlasses(num)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  glasses === num
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border/30 text-foreground hover:bg-accent"
                )}
              >
                {num}
              </button>
            ))}
          </div>

          <Button onClick={handleSubmit} className="w-full" size="lg">
            Log Water
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
