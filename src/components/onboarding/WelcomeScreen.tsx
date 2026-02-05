import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

interface WelcomeScreenProps {
  onNext: () => void;
}

export const WelcomeScreen = ({ onNext }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      {/* Logo/Brand */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="w-20 h-20 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-glow">
          <Zap className="w-10 h-10 text-white" fill="currentColor" />
        </div>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold text-center font-display leading-tight mb-4"
      >
        Nutrition Built
        <br />
        <span className="text-gradient-hero">Around Your Core</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-lg text-muted-foreground text-center max-w-md mb-12"
      >
        AI-powered macros that adapt to your body, goals, and progress
      </motion.p>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-wrap gap-3 justify-center mb-12 max-w-md"
      >
        {["Personalized Macros", "AI Body Analysis", "Adaptive Plans"].map(
          (feature, index) => (
            <motion.span
              key={feature}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="px-4 py-2 rounded-full bg-card border border-border text-sm text-muted-foreground"
            >
              {feature}
            </motion.span>
          )
        )}
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Button
          size="lg"
          onClick={onNext}
          className="bg-gradient-hero hover:opacity-90 text-white px-10 py-6 text-lg font-semibold rounded-2xl shadow-button transition-all hover:scale-105"
        >
          Get Started
        </Button>
      </motion.div>

      {/* Bottom text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 text-sm text-muted-foreground"
      >
        No crash diets. Just smart nutrition.
      </motion.p>
    </div>
  );
};
