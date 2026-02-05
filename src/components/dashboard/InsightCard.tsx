import { motion } from "framer-motion";
import { ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface InsightCardProps {
  icon: string;
  headline: string;
  body: string;
  ctaText?: string;
  variant?: "protein" | "carbs" | "fats" | "primary";
  onAction?: () => void;
  onDismiss?: () => void;
  delay?: number;
}

const variantStyles = {
  protein: "from-protein-teal/15 to-primary/10 border-protein-teal/30",
  carbs: "from-carb-amber/15 to-primary/10 border-carb-amber/30",
  fats: "from-fat-plum/15 to-primary/10 border-fat-plum/30",
  primary: "from-primary/15 to-primary/5 border-primary/30",
};

export const InsightCard = ({
  icon,
  headline,
  body,
  ctaText = "Learn More",
  variant = "primary",
  onAction,
  onDismiss,
  delay = 0,
}: InsightCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "relative p-4 rounded-xl bg-gradient-to-r border",
        variantStyles[variant]
      )}
    >
      {/* Dismiss button */}
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Icon */}
      <span className="text-3xl">{icon}</span>

      {/* Content */}
      <h3 className="text-base font-semibold text-foreground mt-2">{headline}</h3>
      <p className="text-sm text-foreground/90 mt-1 pr-6">{body}</p>

      {/* CTA */}
      {onAction && (
        <button
          onClick={onAction}
          className="flex items-center gap-1 mt-3 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          {ctaText}
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
};
