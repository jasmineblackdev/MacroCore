import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronDown, Plus, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNutritionAI, SuggestedMeal, UserProfile } from "@/hooks/useNutritionAI";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface AIMealSuggestionsProps {
  userProfile: UserProfile;
  currentMacros?: {
    protein: number;
    carbs: number;
    fats: number;
    calories: number;
  };
  mealType?: "breakfast" | "lunch" | "dinner" | "snack";
  onAddMeal?: (meal: SuggestedMeal) => void;
}

export const AIMealSuggestions = ({
  userProfile,
  currentMacros,
  mealType,
  onAddMeal,
}: AIMealSuggestionsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestedMeal[]>([]);
  const [addedMeals, setAddedMeals] = useState<string[]>([]);
  const { isLoading, suggestMeals } = useNutritionAI();

  const handleGetSuggestions = async () => {
    setIsExpanded(true);
    const result = await suggestMeals(userProfile, mealType);
    if (result?.meals) {
      setSuggestions(result.meals);
    }
  };

  const handleAddMeal = (meal: SuggestedMeal) => {
    setAddedMeals(prev => [...prev, meal.name]);
    onAddMeal?.(meal);
    toast.success(`${meal.name} added!`, {
      description: `${meal.protein}g protein • ${meal.calories} cal`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl bg-gradient-to-r from-primary/10 to-fat-plum/10 border border-primary/20 overflow-hidden"
    >
      <button
        onClick={handleGetSuggestions}
        className="w-full flex items-center justify-between p-4"
        disabled={isLoading}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-foreground">AI Meal Suggestions</h3>
            <p className="text-sm text-muted-foreground">
              Personalized meals based on your macros & goals
            </p>
          </div>
        </div>
        {isLoading ? (
          <Loader2 className="w-5 h-5 text-primary animate-spin" />
        ) : (
          <ChevronDown 
            className={cn(
              "w-5 h-5 text-muted-foreground transition-transform",
              isExpanded && "rotate-180"
            )} 
          />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">
              {isLoading ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Analyzing your nutrition needs...
                  </p>
                </div>
              ) : suggestions.length > 0 ? (
                suggestions.map((meal, index) => {
                  const isAdded = addedMeals.includes(meal.name);
                  return (
                    <motion.div
                      key={meal.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 rounded-xl bg-card border border-border/30"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-foreground">{meal.name}</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {meal.description}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant={isAdded ? "secondary" : "default"}
                          onClick={() => handleAddMeal(meal)}
                          disabled={isAdded}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3 h-3" />
                              Added
                            </>
                          ) : (
                            <>
                              <Plus className="w-3 h-3" />
                              Add
                            </>
                          )}
                        </Button>
                      </div>

                      {/* Macros */}
                      <div className="flex gap-3 text-xs">
                        <span className="text-protein-teal">P: {meal.protein}g</span>
                        <span className="text-carb-amber">C: {meal.carbs}g</span>
                        <span className="text-fat-plum">F: {meal.fats}g</span>
                        <span className="text-foreground font-medium">{meal.calories} cal</span>
                      </div>

                      {/* Benefits */}
                      {meal.benefits && meal.benefits.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {meal.benefits.map((benefit) => (
                            <span
                              key={benefit}
                              className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium"
                            >
                              {benefit}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Prep Time */}
                      {meal.prepTime && (
                        <p className="text-xs text-muted-foreground mt-2">
                          ⏱️ {meal.prepTime}
                        </p>
                      )}
                    </motion.div>
                  );
                })
              ) : (
                <div className="text-center py-4 text-muted-foreground text-sm">
                  Tap above to get AI-powered meal suggestions
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
