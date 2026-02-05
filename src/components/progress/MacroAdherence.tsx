import { motion } from "framer-motion";

interface MacroAdherenceProps {
  proteinDays: number;
  carbsDays: number;
  fatsDays: number;
  totalDays: number;
}

export const MacroAdherence = ({ proteinDays, carbsDays, fatsDays, totalDays }: MacroAdherenceProps) => {
  const macros = [
    { label: "Protein", days: proteinDays, color: "bg-protein-teal" },
    { label: "Carbs", days: carbsDays, color: "bg-carb-amber" },
    { label: "Fats", days: fatsDays, color: "bg-fat-plum" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="p-4 rounded-xl bg-card border border-border/30"
    >
      <h3 className="font-semibold text-foreground mb-4">Macro Adherence (Last {totalDays} Days)</h3>

      <div className="space-y-4">
        {macros.map((macro) => {
          const percentage = (macro.days / totalDays) * 100;
          return (
            <div key={macro.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-foreground">{macro.label}</span>
                <span className="text-sm text-muted-foreground">
                  {macro.days}/{totalDays} days ({percentage.toFixed(0)}%)
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`h-full rounded-full ${macro.color}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
