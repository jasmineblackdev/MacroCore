import { motion } from "framer-motion";

interface MacroRingsProps {
  protein: number;
  carbs: number;
  fats: number;
  calories?: number;
  size?: number;
  animated?: boolean;
}

export const MacroRings = ({
  protein,
  carbs,
  fats,
  calories = 2000,
  size = 280,
  animated = true,
}: MacroRingsProps) => {
  const total = protein + carbs + fats;
  const proteinPercent = (protein / total) * 100;
  const carbsPercent = (carbs / total) * 100;
  const fatsPercent = (fats / total) * 100;

  const strokeWidth = 12;
  const gap = 16;
  
  const rings = [
    {
      percent: proteinPercent,
      grams: protein,
      label: "Protein",
      color: "hsl(171, 65%, 47%)",
      radius: size / 2 - strokeWidth,
    },
    {
      percent: carbsPercent,
      grams: carbs,
      label: "Carbs",
      color: "hsl(37, 100%, 52%)",
      radius: size / 2 - strokeWidth - gap,
    },
    {
      percent: fatsPercent,
      grams: fats,
      label: "Fats",
      color: "hsl(250, 74%, 63%)",
      radius: size / 2 - strokeWidth - gap * 2,
    },
  ];

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {rings.map((ring, index) => {
          const circumference = 2 * Math.PI * ring.radius;
          const offset = circumference - (ring.percent / 100) * circumference;

          return (
            <g key={ring.label}>
              {/* Background ring */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={ring.radius}
                fill="none"
                stroke="hsl(230, 20%, 18%)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              {/* Animated progress ring */}
              <motion.circle
                cx={size / 2}
                cy={size / 2}
                r={ring.radius}
                fill="none"
                stroke={ring.color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={animated ? { strokeDashoffset: circumference } : { strokeDashoffset: offset }}
                animate={{ strokeDashoffset: offset }}
                transition={{
                  duration: 1.2,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                style={{
                  filter: `drop-shadow(0 0 8px ${ring.color}50)`,
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-3xl font-bold text-foreground font-display"
          initial={animated ? { opacity: 0, scale: 0.5 } : {}}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          {calories}
        </motion.span>
        <motion.span
          className="text-sm text-muted-foreground"
          initial={animated ? { opacity: 0 } : {}}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
        >
          calories
        </motion.span>
      </div>
    </div>
  );
};

export const MacroLegend = ({
  protein,
  carbs,
  fats,
}: {
  protein: number;
  carbs: number;
  fats: number;
}) => {
  const items = [
    { label: "Protein", grams: protein, color: "bg-protein" },
    { label: "Carbs", grams: carbs, color: "bg-carb" },
    { label: "Fats", grams: fats, color: "bg-fat" },
  ];

  return (
    <div className="flex gap-6 justify-center">
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 + index * 0.1 }}
        >
          <div className={`w-3 h-3 rounded-full ${item.color}`} />
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">{item.label}</span>
            <span className="text-sm font-semibold text-foreground">{item.grams}g</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
