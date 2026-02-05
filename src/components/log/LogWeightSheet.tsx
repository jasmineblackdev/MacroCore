import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Scale, TrendingDown, TrendingUp, Minus } from "lucide-react";

interface LogWeightSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LogWeightSheet = ({ open, onOpenChange }: LogWeightSheetProps) => {
  const [weight, setWeight] = useState("");
  const previousWeight = 142.6; // Mock data

  const handleSubmit = () => {
    if (!weight) {
      toast.error("Please enter your weight");
      return;
    }

    const newWeight = parseFloat(weight);
    const change = newWeight - previousWeight;
    
    toast.success(`Weight logged: ${newWeight} lbs`, {
      description: change > 0 
        ? `+${change.toFixed(1)} lbs from yesterday`
        : change < 0 
        ? `${change.toFixed(1)} lbs from yesterday`
        : "No change from yesterday",
    });
    
    setWeight("");
    onOpenChange(false);
  };

  const getTrendIcon = () => {
    const newWeight = parseFloat(weight);
    if (!weight || isNaN(newWeight)) return null;
    
    const change = newWeight - previousWeight;
    if (change > 0) return <TrendingUp className="w-5 h-5 text-carb-amber" />;
    if (change < 0) return <TrendingDown className="w-5 h-5 text-protein-teal" />;
    return <Minus className="w-5 h-5 text-muted-foreground" />;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Scale className="w-5 h-5 text-primary" />
            </div>
            Log Weight
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 pb-6">
          {/* Previous Weight */}
          <div className="p-4 rounded-xl bg-card border border-border/30">
            <span className="text-sm text-muted-foreground">Previous weight</span>
            <p className="text-2xl font-semibold text-foreground">{previousWeight} lbs</p>
          </div>

          {/* Weight Input */}
          <div className="space-y-2">
            <Label htmlFor="weight">Today's Weight</Label>
            <div className="relative">
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder="Enter weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="text-lg pr-16"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                lbs
              </span>
            </div>
          </div>

          {/* Trend Indicator */}
          {weight && (
            <div className="flex items-center gap-2 p-4 rounded-xl bg-card border border-border/30">
              {getTrendIcon()}
              <span className="text-foreground">
                {(() => {
                  const newWeight = parseFloat(weight);
                  if (isNaN(newWeight)) return "Enter a valid weight";
                  const change = newWeight - previousWeight;
                  if (change > 0) return `+${change.toFixed(1)} lbs`;
                  if (change < 0) return `${change.toFixed(1)} lbs`;
                  return "No change";
                })()}
              </span>
            </div>
          )}

          <Button onClick={handleSubmit} className="w-full" size="lg">
            Log Weight
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
