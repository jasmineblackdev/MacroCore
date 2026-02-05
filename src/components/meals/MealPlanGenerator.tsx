import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, Calendar, Loader2, ShoppingCart, ChefHat, Copy, Check } from "lucide-react";
import { useNutritionAI, DailyMealPlan, UserProfile } from "@/hooks/useNutritionAI";
import { toast } from "sonner";

interface MealPlanGeneratorProps {
  userProfile: UserProfile;
}

export const MealPlanGenerator = ({ userProfile }: MealPlanGeneratorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mealPlan, setMealPlan] = useState<DailyMealPlan | null>(null);
  const [copiedList, setCopiedList] = useState(false);
  const { isLoading, createMealPlan } = useNutritionAI();

  const handleGenerate = async () => {
    const result = await createMealPlan(userProfile);
    if (result) {
      setMealPlan(result);
    }
  };

  const handleCopyShoppingList = () => {
    if (mealPlan?.shoppingList) {
      navigator.clipboard.writeText(mealPlan.shoppingList.join("\n"));
      setCopiedList(true);
      toast.success("Shopping list copied!");
      setTimeout(() => setCopiedList(false), 2000);
    }
  };

  const mealOrder = ["breakfast", "snack1", "lunch", "snack2", "dinner"] as const;
  const mealLabels: Record<string, string> = {
    breakfast: "🍳 Breakfast",
    snack1: "🍎 Morning Snack",
    lunch: "🥗 Lunch",
    snack2: "🥜 Afternoon Snack",
    dinner: "🍽️ Dinner",
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full gap-2">
          <Calendar className="w-4 h-4" />
          Generate Meal Plan
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-2xl h-[90vh]">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            AI Meal Plan
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(90vh-100px)]">
          <div className="space-y-4 pr-2 pb-6">
            {!mealPlan && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center py-8 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-fat-plum/20 flex items-center justify-center mb-4">
                  <ChefHat className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Your Personalized Meal Plan
                </h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                  Generate a complete daily meal plan optimized for your {userProfile.goal.replace("-", " ")} goal
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  <span className="px-3 py-1 rounded-full bg-protein-teal/10 text-protein-teal text-xs font-medium">
                    {userProfile.proteinTarget}g protein
                  </span>
                  <span className="px-3 py-1 rounded-full bg-carb-amber/10 text-carb-amber text-xs font-medium">
                    {userProfile.carbsTarget}g carbs
                  </span>
                  <span className="px-3 py-1 rounded-full bg-fat-plum/10 text-fat-plum text-xs font-medium">
                    {userProfile.fatsTarget}g fats
                  </span>
                </div>
                <Button onClick={handleGenerate} className="mt-6 gap-2">
                  <Sparkles className="w-4 h-4" />
                  Generate Plan
                </Button>
              </motion.div>
            )}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center py-12"
              >
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                <p className="text-foreground font-medium">Creating your meal plan...</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Using nutrition science to optimize your day
                </p>
              </motion.div>
            )}

            {mealPlan && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Daily Totals */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-fat-plum/10 border border-primary/20">
                    <h3 className="font-semibold text-foreground mb-2">Daily Totals</h3>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div>
                        <span className="text-lg font-bold text-protein-teal">{mealPlan.totals.protein}g</span>
                        <p className="text-xs text-muted-foreground">Protein</p>
                      </div>
                      <div>
                        <span className="text-lg font-bold text-carb-amber">{mealPlan.totals.carbs}g</span>
                        <p className="text-xs text-muted-foreground">Carbs</p>
                      </div>
                      <div>
                        <span className="text-lg font-bold text-fat-plum">{mealPlan.totals.fats}g</span>
                        <p className="text-xs text-muted-foreground">Fats</p>
                      </div>
                      <div>
                        <span className="text-lg font-bold text-foreground">{mealPlan.totals.calories}</span>
                        <p className="text-xs text-muted-foreground">Calories</p>
                      </div>
                    </div>
                  </div>

                  {/* Meals */}
                  {mealOrder.map((mealKey, index) => {
                    const meal = mealPlan.dailyPlan[mealKey];
                    if (!meal) return null;
                    return (
                      <motion.div
                        key={mealKey}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-xl bg-card border border-border/30"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-sm text-muted-foreground">{mealLabels[mealKey]}</span>
                            <h4 className="font-semibold text-foreground mt-0.5">{meal.name}</h4>
                          </div>
                          <span className="text-sm font-medium text-foreground">{meal.calories} cal</span>
                        </div>
                        <div className="flex gap-3 mt-2 text-xs">
                          <span className="text-protein-teal">P: {meal.protein}g</span>
                          <span className="text-carb-amber">C: {meal.carbs}g</span>
                          <span className="text-fat-plum">F: {meal.fats}g</span>
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* Shopping List */}
                  {mealPlan.shoppingList && mealPlan.shoppingList.length > 0 && (
                    <div className="p-4 rounded-xl bg-card border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <ShoppingCart className="w-4 h-4 text-primary" />
                          <h3 className="font-semibold text-foreground">Shopping List</h3>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCopyShoppingList}
                        >
                          {copiedList ? (
                            <Check className="w-4 h-4 text-protein-teal" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <ul className="space-y-1">
                        {mealPlan.shoppingList.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Meal Prep Tips */}
                  {mealPlan.mealPrepTips && mealPlan.mealPrepTips.length > 0 && (
                    <div className="p-4 rounded-xl bg-card border border-border/30">
                      <div className="flex items-center gap-2 mb-3">
                        <ChefHat className="w-4 h-4 text-primary" />
                        <h3 className="font-semibold text-foreground">Meal Prep Tips</h3>
                      </div>
                      <ul className="space-y-2">
                        {mealPlan.mealPrepTips.map((tip, i) => (
                          <li key={i} className="text-sm text-muted-foreground">
                            💡 {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Regenerate Button */}
                  <Button
                    variant="outline"
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="w-full gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Generate New Plan
                  </Button>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
