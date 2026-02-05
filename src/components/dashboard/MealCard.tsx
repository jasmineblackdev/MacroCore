import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MealCardProps {
  type: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  name?: string;
  protein?: number;
  carbs?: number;
  fats?: number;
  calories?: number;
  isLogged?: boolean;
  icon?: string;
  delay?: number;
  onClick?: () => void;
}

const mealIcons: Record<string, string> = {
  Breakfast: "🍳",
  Lunch: "🥗",
  Dinner: "🍽️",
  Snack: "🍎",
};

export const MealCard = ({
  type,
  name,
  protein,
  carbs,
  fats,
  calories,
  isLogged = false,
  delay = 0,
  onClick,
}: MealCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl bg-card border border-border/30 cursor-pointer",
        "hover:border-border/60 transition-colors",
        !isLogged && "opacity-60"
      )}
    >
      {/* Meal icon */}
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background text-2xl">
        {mealIcons[type]}
      </div>

      {/* Meal details */}
      <div className="flex-1 min-w-0">
        <span className="text-[13px] font-medium text-muted-foreground">{type}</span>
        <p className="text-base font-semibold text-foreground truncate">
          {isLogged ? name : "No meal logged yet"}
        </p>
        {isLogged && protein !== undefined && (
          <div className="flex gap-3 mt-0.5">
            <span className="text-sm text-protein-teal">P: {protein}g</span>
            <span className="text-sm text-carb-amber">C: {carbs}g</span>
            <span className="text-sm text-fat-plum">F: {fats}g</span>
          </div>
        )}
      </div>

      {/* Status */}
      <div className="flex items-center justify-center">
        {isLogged ? (
          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
            <Check className="w-5 h-5 text-green-500" />
          </div>
        ) : (
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Plus className="w-4 h-4" />
            ADD
          </div>
        )}
      </div>
    </motion.div>
  );
};
