import { motion } from "framer-motion";
import { Flame, Dumbbell, Scale } from "lucide-react";
import type { Goal } from "@/pages/Onboarding";

interface GoalScreenProps {
  selected: Goal;
  onSelect: (goal: Goal) => void;
}

const goals = [
  {
    id: "lose-fat" as Goal,
    icon: Flame,
    title: "Lose Fat",
    description: "Shed body fat while preserving muscle",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "gain-muscle" as Goal,
    icon: Dumbbell,
    title: "Gain Muscle",
    description: "Build lean mass with optimized nutrition",
    gradient: "from-protein-teal to-emerald-500",
  },
  {
    id: "maintain" as Goal,
    icon: Scale,
    title: "Maintain",
    description: "Stay balanced and energized",
    gradient: "from-core-blue to-fat-plum",
  },
];

export const GoalScreen = ({ selected, onSelect }: GoalScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-center font-display mb-3"
      >
        What's Your Goal?
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground text-center mb-10"
      >
        We'll tailor your macros to help you get there
      </motion.p>

      <div className="flex flex-col gap-4 w-full max-w-md">
        {goals.map((goal, index) => {
          const Icon = goal.icon;
          const isSelected = selected === goal.id;

          return (
            <motion.button
              key={goal.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + index * 0.1 }}
              onClick={() => onSelect(goal.id)}
              className={`relative w-full p-6 rounded-2xl bg-gradient-card border-2 transition-all duration-300 text-left group hover:scale-[1.02] ${
                isSelected
                  ? "border-primary shadow-glow"
                  : "border-transparent hover:border-border"
              }`}
            >
              <div className="flex items-center gap-5">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${goal.gradient} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {goal.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {goal.description}
                  </p>
                </div>
              </div>

              {isSelected && (
                <motion.div
                  layoutId="goal-check"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
