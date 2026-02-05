import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MacroRings, MacroLegend } from "@/components/MacroRings";
import { Sparkles, Check } from "lucide-react";
import type { OnboardingData } from "@/pages/Index";

interface MacroPreviewScreenProps {
  data: OnboardingData;
  onOptimize: () => void;
  onSkip: () => void;
}

export const MacroPreviewScreen = ({
  data,
  onOptimize,
  onSkip,
}: MacroPreviewScreenProps) => {
  // Calculate basic macros based on user info
  const weight = parseInt(data.userInfo.weight) || 70;
  const goal = data.goal;

  let proteinMultiplier = 2;
  let calories = weight * 30;

  if (goal === "lose-fat") {
    calories = weight * 24;
    proteinMultiplier = 2.2;
  } else if (goal === "gain-muscle") {
    calories = weight * 35;
    proteinMultiplier = 2.4;
  }

  const protein = Math.round(weight * proteinMultiplier);
  const fats = Math.round((calories * 0.25) / 9);
  const carbs = Math.round((calories - protein * 4 - fats * 9) / 4);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-center font-display mb-3"
      >
        Your Macro Plan
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground text-center mb-8 max-w-sm"
      >
        Based on your info, here's your starting plan
      </motion.p>

      {/* Macro Rings */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-6"
      >
        <MacroRings
          protein={protein}
          carbs={carbs}
          fats={fats}
          calories={calories}
        />
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mb-10"
      >
        <MacroLegend protein={protein} carbs={carbs} fats={fats} />
      </motion.div>

      {/* Optimization prompt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="w-full max-w-md space-y-4"
      >
        <div className="p-4 rounded-2xl bg-card border border-border">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-core-blue to-fat-plum flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-foreground font-medium">
                Want even better results?
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Our AI body scan identifies stubborn areas and optimizes your
                plan for targeted results.
              </p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <Button
            size="lg"
            onClick={onOptimize}
            className="w-full bg-gradient-hero hover:opacity-90 text-white py-6 text-lg font-semibold rounded-2xl shadow-button transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Optimize with Body Scan
          </Button>

          <Button
            variant="ghost"
            size="lg"
            onClick={onSkip}
            className="w-full text-muted-foreground hover:text-foreground py-6 text-lg rounded-2xl"
          >
            <Check className="w-5 h-5 mr-2" />
            This is Good Enough
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
