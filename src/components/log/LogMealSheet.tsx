import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { UtensilsCrossed, Search, Plus } from "lucide-react";
import { mockMeals } from "@/data/mockMeals";
import { cn } from "@/lib/utils";

interface LogMealSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mealTypes = ["breakfast", "lunch", "dinner", "snack"] as const;

export const LogMealSheet = ({ open, onOpenChange }: LogMealSheetProps) => {
  const [selectedMealType, setSelectedMealType] = useState<typeof mealTypes[number]>("breakfast");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMeals = mockMeals.filter((meal) =>
    meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    meal.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddMeal = (mealName: string, calories: number) => {
    toast.success(`${mealName} logged as ${selectedMealType}!`, {
      description: `${calories} calories added to your daily log`,
    });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl h-[85vh]">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-primary" />
            </div>
            Log Meal
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-4">
          {/* Meal Type Selection */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {mealTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedMealType(type)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-colors",
                  selectedMealType === type
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border/30 text-muted-foreground hover:text-foreground"
                )}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search meals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-card border-border/30"
            />
          </div>

          {/* Meal List */}
          <ScrollArea className="h-[calc(85vh-250px)]">
            <div className="space-y-2 pr-2">
              {filteredMeals.map((meal) => (
                <div
                  key={meal.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/30"
                >
                  <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-2xl">
                    {meal.imageEmoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">{meal.name}</p>
                    <div className="flex gap-2 text-xs mt-0.5">
                      <span className="text-protein-teal">P: {meal.protein}g</span>
                      <span className="text-carb-amber">C: {meal.carbs}g</span>
                      <span className="text-fat-plum">F: {meal.fats}g</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{meal.calories} cal</span>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleAddMeal(meal.name, meal.calories)}
                    className="shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};
