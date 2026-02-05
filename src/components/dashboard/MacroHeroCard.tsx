import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { MacroRings } from "@/components/MacroRings";

interface MacroHeroCardProps {
  proteinCurrent: number;
  proteinTarget: number;
  carbsCurrent: number;
  carbsTarget: number;
  fatsCurrent: number;
  fatsTarget: number;
  caloriesCurrent: number;
  caloriesTarget: number;
}

export const MacroHeroCard = ({
  proteinCurrent,
  proteinTarget,
  carbsCurrent,
  carbsTarget,
  fatsCurrent,
  fatsTarget,
  caloriesCurrent,
  caloriesTarget,
}: MacroHeroCardProps) => {
  const totalProgress = Math.round((caloriesCurrent / caloriesTarget) * 100);

  const macros = [
    { label: "P", value: proteinCurrent, target: proteinTarget, color: "text-protein-teal" },
    { label: "C", value: carbsCurrent, target: carbsTarget, color: "text-carb-amber" },
    { label: "F", value: fatsCurrent, target: fatsTarget, color: "text-fat-plum" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-4 p-6 rounded-2xl bg-gradient-to-b from-card to-background border border-border/30"
    >
      <h2 className="text-base font-semibold text-foreground mb-4">TODAY'S MACROS</h2>

      <div className="flex flex-col items-center">
        {/* Macro Ring */}
        <MacroRings
          protein={proteinCurrent}
          carbs={carbsCurrent}
          fats={fatsCurrent}
          calories={caloriesCurrent}
          size={160}
          animated={true}
        />

        {/* Macro breakdown */}
        <div className="flex justify-center gap-8 mt-4">
          {macros.map((macro) => (
            <div key={macro.label} className="text-center">
              <span className={`text-xl font-medium ${macro.color}`}>{macro.value}g</span>
              <span className="block text-sm text-muted-foreground">{macro.label}</span>
            </div>
          ))}
        </div>

        {/* Link to full breakdown */}
        <button className="flex items-center gap-1 mt-4 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          View Full Breakdown
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
