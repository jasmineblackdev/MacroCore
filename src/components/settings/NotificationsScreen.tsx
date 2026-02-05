import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface NotificationsScreenProps {
  onBack: () => void;
}

export const NotificationsScreen = ({ onBack }: NotificationsScreenProps) => {
  const [settings, setSettings] = useState({
    mealReminders: true,
    weightReminders: true,
    progressUpdates: true,
    weeklyReports: true,
    motivationalTips: false,
    newFeatures: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success("Notification settings updated");
  };

  const notificationOptions = [
    { key: "mealReminders" as const, label: "Meal Reminders", description: "Get reminded to log your meals" },
    { key: "weightReminders" as const, label: "Weight Reminders", description: "Daily weight logging reminder" },
    { key: "progressUpdates" as const, label: "Progress Updates", description: "Weekly progress summaries" },
    { key: "weeklyReports" as const, label: "Weekly Reports", description: "Detailed weekly nutrition reports" },
    { key: "motivationalTips" as const, label: "Motivational Tips", description: "Daily motivation and tips" },
    { key: "newFeatures" as const, label: "New Features", description: "Get notified about app updates" },
  ];

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-background z-50"
    >
      <header className="flex items-center gap-3 px-4 py-4 h-16 border-b border-border/30">
        <button onClick={onBack} className="p-1">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">Notifications</h1>
      </header>

      <div className="p-4 space-y-2">
        {notificationOptions.map((option) => (
          <div
            key={option.key}
            className="flex items-center justify-between p-4 rounded-xl bg-card border border-border/30"
          >
            <div className="flex-1">
              <p className="font-medium text-foreground">{option.label}</p>
              <p className="text-sm text-muted-foreground">{option.description}</p>
            </div>
            <Switch
              checked={settings[option.key]}
              onCheckedChange={() => handleToggle(option.key)}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
};
