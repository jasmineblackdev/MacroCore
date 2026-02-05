import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MealData {
  id: string;
  name: string;
  description: string;
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
  dietType: "omnivore" | "vegetarian" | "vegan" | "pescatarian";
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  imageEmoji: string;
  isAdded?: boolean;
}

interface MealBrowserCardProps {
  meal: MealData;
  onAdd?: (meal: MealData) => void;
  delay?: number;
}

export const MealBrowserCard = ({ meal, onAdd, delay = 0 }: MealBrowserCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="bg-card border border-border/30 rounded-xl overflow-hidden"
    >
      {/* Image/Emoji Header */}
      <div className="h-24 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
        <span className="text-5xl">{meal.imageEmoji}</span>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-semibold text-foreground text-sm truncate">{meal.name}</h3>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{meal.description}</p>

        {/* Macros */}
        <div className="flex gap-2 mt-2 text-xs">
          <span className="text-protein-teal">P: {meal.protein}g</span>
          <span className="text-carb-amber">C: {meal.carbs}g</span>
          <span className="text-fat-plum">F: {meal.fats}g</span>
        </div>

        {/* Calories & Add Button */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-sm font-medium text-foreground">{meal.calories} cal</span>
          <button
            onClick={() => onAdd?.(meal)}
            className={cn(
              "flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
              meal.isAdded
                ? "bg-green-500/20 text-green-500"
                : "bg-primary/10 text-primary hover:bg-primary/20"
            )}
          >
            {meal.isAdded ? (
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
          </button>
        </div>
      </div>
    </motion.div>
  );
};
