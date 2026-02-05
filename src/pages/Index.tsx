import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WelcomeScreen } from "@/components/onboarding/WelcomeScreen";
import { GoalScreen } from "@/components/onboarding/GoalScreen";
import { DietScreen } from "@/components/onboarding/DietScreen";
import { UserInfoScreen } from "@/components/onboarding/UserInfoScreen";
import { MacroPreviewScreen } from "@/components/onboarding/MacroPreviewScreen";
import { BodyScanScreen } from "@/components/onboarding/BodyScanScreen";
import { PlanReadyScreen } from "@/components/onboarding/PlanReadyScreen";

export type Goal = "lose-fat" | "gain-muscle" | "maintain" | null;
export type Diet = "omnivore" | "vegetarian" | "vegan" | "pescatarian" | null;

export interface UserInfo {
  height: string;
  weight: string;
  age: string;
  gender: "male" | "female" | "other" | null;
  activityLevel: string;
  bloodType: string;
}

export interface OnboardingData {
  goal: Goal;
  diet: Diet;
  userInfo: UserInfo;
  bodyScanCompleted: boolean;
}

const Index = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    goal: null,
    diet: null,
    userInfo: {
      height: "",
      weight: "",
      age: "",
      gender: null,
      activityLevel: "",
      bloodType: "",
    },
    bodyScanCompleted: false,
  });

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const skipToReady = () => setStep(7);

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Background glow effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-glow opacity-40" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-radial from-fat-plum/10 to-transparent" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="min-h-screen"
        >
          {step === 1 && <WelcomeScreen onNext={nextStep} />}
          {step === 2 && (
            <GoalScreen
              selected={data.goal}
              onSelect={(goal) => {
                updateData({ goal });
                setTimeout(nextStep, 400);
              }}
            />
          )}
          {step === 3 && (
            <DietScreen
              selected={data.diet}
              onSelect={(diet) => updateData({ diet })}
              onNext={nextStep}
            />
          )}
          {step === 4 && (
            <UserInfoScreen
              userInfo={data.userInfo}
              onUpdate={(userInfo) => updateData({ userInfo })}
              onNext={nextStep}
            />
          )}
          {step === 5 && (
            <MacroPreviewScreen
              data={data}
              onOptimize={nextStep}
              onSkip={skipToReady}
            />
          )}
          {step === 6 && (
            <BodyScanScreen
              onComplete={() => {
                updateData({ bodyScanCompleted: true });
                nextStep();
              }}
              onSkip={nextStep}
            />
          )}
          {step === 7 && <PlanReadyScreen data={data} />}
        </motion.div>
      </AnimatePresence>

      {/* Progress indicator */}
      {step > 1 && step < 7 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {[2, 3, 4, 5, 6].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === step
                  ? "w-8 bg-primary"
                  : s < step
                  ? "w-2 bg-primary/60"
                  : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;
