import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MacroRings, MacroLegend } from "@/components/MacroRings";
import {
  Utensils,
  TrendingUp,
  RefreshCw,
  ChevronRight,
  Check,
} from "lucide-react";
import type { OnboardingData } from "@/pages/Index";

interface PlanReadyScreenProps {
  data: OnboardingData;
}

export const PlanReadyScreen = ({ data }: PlanReadyScreenProps) => {
  // Calculate optimized macros (slightly adjusted if body scan completed)
  const weight = parseInt(data.userInfo.weight) || 70;
  const goal = data.goal;
  const optimized = data.bodyScanCompleted;

  let proteinMultiplier = 2;
  let calories = weight * 30;

  if (goal === "lose-fat") {
    calories = weight * (optimized ? 23 : 24);
    proteinMultiplier = optimized ? 2.3 : 2.2;
  } else if (goal === "gain-muscle") {
    calories = weight * (optimized ? 36 : 35);
    proteinMultiplier = optimized ? 2.5 : 2.4;
  }

  const protein = Math.round(weight * proteinMultiplier);
  const fats = Math.round((calories * 0.25) / 9);
  const carbs = Math.round((calories - protein * 4 - fats * 9) / 4);

  const features = [
    {
      icon: Utensils,
      title: "Browse 100+ meals",
      description: "Tailored to your preferences",
    },
    {
      icon: TrendingUp,
      title: "Track your progress",
      description: "Log weight and measurements",
    },
    {
      icon: RefreshCw,
      title: "Auto-adjustments",
      description: "We adapt when progress stalls",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-12">
      {/* Success badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6 shadow-glow"
      >
        <Check className="w-8 h-8 text-secondary-foreground" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl md:text-4xl font-bold text-center font-display mb-2"
      >
        Your Plan is Ready!
      </motion.h1>

      {optimized && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm mb-4"
        >
          ✨ Optimized with AI
        </motion.span>
      )}

      {/* Final Macro Rings */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-4"
      >
        <MacroRings
          protein={protein}
          carbs={carbs}
          fats={fats}
          calories={calories}
          size={220}
        />
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mb-8"
      >
        <MacroLegend protein={protein} carbs={carbs} fats={fats} />
      </motion.div>

      {/* What happens next */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="w-full max-w-md mb-8"
      >
        <h2 className="text-lg font-semibold text-center mb-4">
          Here's what happens next:
        </h2>

        <div className="space-y-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
              >
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="w-full max-w-md"
      >
        <Button
          size="lg"
          className="w-full bg-gradient-hero hover:opacity-90 text-white py-6 text-lg font-semibold rounded-2xl shadow-button transition-all hover:scale-[1.02]"
        >
          Start Using MacroCore
        </Button>
      </motion.div>
    </div>
  );
};
