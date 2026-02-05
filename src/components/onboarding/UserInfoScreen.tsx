import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { UserInfo } from "@/pages/Index";

interface UserInfoScreenProps {
  userInfo: UserInfo;
  onUpdate: (userInfo: UserInfo) => void;
  onNext: () => void;
}

export const UserInfoScreen = ({
  userInfo,
  onUpdate,
  onNext,
}: UserInfoScreenProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateField = (field: keyof UserInfo, value: string | null) => {
    onUpdate({ ...userInfo, [field]: value });
  };

  const genderOptions = [
    { id: "male", label: "Male" },
    { id: "female", label: "Female" },
    { id: "other", label: "Other" },
  ];

  const isValid =
    userInfo.height && userInfo.weight && userInfo.age && userInfo.gender;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-center font-display mb-3"
      >
        Tell Us About You
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground text-center mb-10"
      >
        This helps us calculate your ideal macros
      </motion.p>

      <div className="w-full max-w-md space-y-6">
        {/* Basic Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="space-y-2">
            <Label htmlFor="height" className="text-muted-foreground text-sm">
              Height (cm)
            </Label>
            <Input
              id="height"
              type="number"
              placeholder="175"
              value={userInfo.height}
              onChange={(e) => updateField("height", e.target.value)}
              className="bg-card border-border text-foreground h-14 text-lg rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight" className="text-muted-foreground text-sm">
              Weight (kg)
            </Label>
            <Input
              id="weight"
              type="number"
              placeholder="70"
              value={userInfo.weight}
              onChange={(e) => updateField("weight", e.target.value)}
              className="bg-card border-border text-foreground h-14 text-lg rounded-xl"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <Label htmlFor="age" className="text-muted-foreground text-sm">
            Age
          </Label>
          <Input
            id="age"
            type="number"
            placeholder="28"
            value={userInfo.age}
            onChange={(e) => updateField("age", e.target.value)}
            className="bg-card border-border text-foreground h-14 text-lg rounded-xl w-full"
          />
        </motion.div>

        {/* Gender Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="space-y-2"
        >
          <Label className="text-muted-foreground text-sm">Gender</Label>
          <div className="grid grid-cols-3 gap-3">
            {genderOptions.map((option) => (
              <button
                key={option.id}
                onClick={() =>
                  updateField("gender", option.id as UserInfo["gender"])
                }
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  userInfo.gender === option.id
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-muted-foreground"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Advanced Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showAdvanced ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
            <span className="text-sm">Advanced Options</span>
          </button>

          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 space-y-4"
            >
              <div className="space-y-2">
                <Label className="text-muted-foreground text-sm">
                  Activity Level
                </Label>
                <select
                  value={userInfo.activityLevel}
                  onChange={(e) => updateField("activityLevel", e.target.value)}
                  className="w-full h-14 px-4 rounded-xl bg-card border border-border text-foreground"
                >
                  <option value="">Select activity level</option>
                  <option value="sedentary">Sedentary (little exercise)</option>
                  <option value="light">Light (1-3 days/week)</option>
                  <option value="moderate">Moderate (3-5 days/week)</option>
                  <option value="active">Active (6-7 days/week)</option>
                  <option value="very-active">Very Active (2x/day)</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-sm">
                  Blood Type (optional)
                </Label>
                <select
                  value={userInfo.bloodType}
                  onChange={(e) => updateField("bloodType", e.target.value)}
                  className="w-full h-14 px-4 rounded-xl bg-card border border-border text-foreground"
                >
                  <option value="">Select blood type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-4"
        >
          <Button
            size="lg"
            disabled={!isValid}
            onClick={onNext}
            className="w-full bg-gradient-hero hover:opacity-90 text-white py-6 text-lg font-semibold rounded-2xl shadow-button transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
