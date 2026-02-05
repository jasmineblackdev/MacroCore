import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  change?: number;
  icon?: React.ReactNode;
  delay?: number;
}

const StatCard = ({ label, value, change, icon, delay = 0 }: StatCardProps) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="flex-1 p-4 rounded-xl bg-card border border-border/30"
    >
      <span className="text-[13px] text-muted-foreground">{label}</span>
      <div className="flex items-end gap-2 mt-1">
        <span className="text-2xl font-semibold text-foreground">{value}</span>
        {icon}
      </div>
      {change !== undefined && (
        <div className="flex items-center gap-1 mt-1">
          {isNegative ? (
            <TrendingDown className="w-4 h-4 text-green-500" />
          ) : isPositive ? (
            <TrendingUp className="w-4 h-4 text-red-400" />
          ) : null}
          <span
            className={cn(
              "text-sm font-medium",
              isNegative ? "text-green-500" : isPositive ? "text-red-400" : "text-muted-foreground"
            )}
          >
            {Math.abs(change)} lbs
          </span>
        </div>
      )}
    </motion.div>
  );
};

interface QuickStatsProps {
  currentWeight: number;
  weightChange: number;
  streak: number;
  onWeightClick?: () => void;
  onStreakClick?: () => void;
}

export const QuickStats = ({ 
  currentWeight, 
  weightChange, 
  streak,
  onWeightClick,
  onStreakClick,
}: QuickStatsProps) => {
  return (
    <div className="flex gap-3 px-4 mt-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        onClick={onWeightClick}
        className="flex-1 p-4 rounded-xl bg-card border border-border/30 cursor-pointer hover:bg-accent transition-colors"
      >
        <span className="text-[13px] text-muted-foreground">Weight Today</span>
        <div className="flex items-end gap-2 mt-1">
          <span className="text-2xl font-semibold text-foreground">{currentWeight} lbs</span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          {weightChange < 0 ? (
            <TrendingDown className="w-4 h-4 text-protein-teal" />
          ) : weightChange > 0 ? (
            <TrendingUp className="w-4 h-4 text-carb-amber" />
          ) : null}
          <span
            className={cn(
              "text-sm font-medium",
              weightChange < 0 ? "text-protein-teal" : weightChange > 0 ? "text-carb-amber" : "text-muted-foreground"
            )}
          >
            {Math.abs(weightChange)} lbs
          </span>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        onClick={onStreakClick}
        className="flex-1 p-4 rounded-xl bg-card border border-border/30 cursor-pointer hover:bg-accent transition-colors"
      >
        <span className="text-[13px] text-muted-foreground">Streak</span>
        <div className="flex items-end gap-2 mt-1">
          <span className="text-2xl font-semibold text-foreground">{streak} days</span>
          <Flame className="w-5 h-5 text-carb-amber mb-1" />
        </div>
        <div className="flex items-center gap-1 mt-1 text-carb-amber">
          <span className="text-sm font-medium">On fire!</span>
        </div>
      </motion.div>
    </div>
  );
};
