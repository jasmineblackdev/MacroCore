import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed } from "lucide-react";

interface EmptyMealsStateProps {
  onBrowseMeals?: () => void;
}

export const EmptyMealsState = ({ onBrowseMeals }: EmptyMealsStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center p-8 rounded-xl bg-card border border-border/30 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mb-4">
        <UtensilsCrossed className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">Start Your Day</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-[200px]">
        Log your first meal to track your macros
      </p>
      <Button onClick={onBrowseMeals} className="mt-4">
        Browse Meals
      </Button>
    </motion.div>
  );
};
