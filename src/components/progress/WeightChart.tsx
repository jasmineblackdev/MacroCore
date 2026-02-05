import { motion } from "framer-motion";
import { TrendingDown, TrendingUp } from "lucide-react";

interface WeightEntry {
  date: string;
  weight: number;
}

interface WeightChartProps {
  data: WeightEntry[];
}

export const WeightChart = ({ data }: WeightChartProps) => {
  if (data.length === 0) return null;

  const weights = data.map(d => d.weight);
  const minWeight = Math.min(...weights) - 2;
  const maxWeight = Math.max(...weights) + 2;
  const range = maxWeight - minWeight;

  const getY = (weight: number) => {
    return 100 - ((weight - minWeight) / range) * 100;
  };

  const pathData = data
    .map((entry, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = getY(entry.weight);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const firstWeight = data[0]?.weight || 0;
  const lastWeight = data[data.length - 1]?.weight || 0;
  const totalChange = lastWeight - firstWeight;
  const isLoss = totalChange < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl bg-card border border-border/30"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Weight Trend</h3>
        <div className={`flex items-center gap-1 text-sm font-medium ${isLoss ? "text-protein-teal" : "text-carb-amber"}`}>
          {isLoss ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
          {Math.abs(totalChange).toFixed(1)} lbs
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-32">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="currentColor"
              strokeWidth="0.3"
              className="text-border"
            />
          ))}

          {/* Gradient fill */}
          <defs>
            <linearGradient id="weightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area fill */}
          <path
            d={`${pathData} L 100 100 L 0 100 Z`}
            fill="url(#weightGradient)"
          />

          {/* Line */}
          <motion.path
            d={pathData}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {/* Data points */}
          {data.map((entry, i) => (
            <circle
              key={i}
              cx={(i / (data.length - 1)) * 100}
              cy={getY(entry.weight)}
              r="2"
              fill="hsl(var(--primary))"
            />
          ))}
        </svg>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground -ml-1">
          <span>{maxWeight.toFixed(0)}</span>
          <span>{minWeight.toFixed(0)}</span>
        </div>
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <span>{data[0]?.date}</span>
        <span>{data[data.length - 1]?.date}</span>
      </div>
    </motion.div>
  );
};
