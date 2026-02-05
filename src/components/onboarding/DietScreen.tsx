import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Beef, Leaf, Vegan, Fish } from "lucide-react";
import type { Diet } from "@/pages/Index";

interface DietScreenProps {
  selected: Diet;
  onSelect: (diet: Diet) => void;
  onNext: () => void;
}

const diets = [
  { id: "omnivore" as Diet, icon: Beef, label: "Omnivore", emoji: "🥩" },
  { id: "vegetarian" as Diet, icon: Leaf, label: "Vegetarian", emoji: "🥗" },
  { id: "vegan" as Diet, icon: Vegan, label: "Vegan", emoji: "🌱" },
  { id: "pescatarian" as Diet, icon: Fish, label: "Pescatarian", emoji: "🐟" },
];

export const DietScreen = ({ selected, onSelect, onNext }: DietScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-center font-display mb-3"
      >
        How Do You Eat?
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground text-center mb-10"
      >
        We'll customize your meal suggestions
      </motion.p>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-10">
        {diets.map((diet, index) => {
          const isSelected = selected === diet.id;

          return (
            <motion.button
              key={diet.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + index * 0.08 }}
              onClick={() => onSelect(diet.id)}
              className={`relative p-6 rounded-2xl bg-gradient-card border-2 transition-all duration-300 text-center group hover:scale-[1.03] ${
                isSelected
                  ? "border-primary shadow-glow"
                  : "border-transparent hover:border-border"
              }`}
            >
              <span className="text-4xl mb-3 block">{diet.emoji}</span>
              <span className="text-lg font-medium text-foreground">
                {diet.label}
              </span>

              {isSelected && (
                <motion.div
                  layoutId="diet-check"
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          size="lg"
          disabled={!selected}
          onClick={onNext}
          className="bg-gradient-hero hover:opacity-90 text-white px-10 py-6 text-lg font-semibold rounded-2xl shadow-button transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue
        </Button>
      </motion.div>
    </div>
  );
};
