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
}

export const QuickStats = ({ currentWeight, weightChange, streak }: QuickStatsProps) => {
  return (
    <div className="flex gap-3 px-4 mt-4">
      <StatCard
        label="Weight Today"
        value={`${currentWeight} lbs`}
        change={weightChange}
        delay={0.1}
      />
      <StatCard
        label="Streak"
        value={`${streak} days`}
        icon={<Flame className="w-5 h-5 text-carb-amber mb-1" />}
        delay={0.2}
      />
    </div>
  );
};
