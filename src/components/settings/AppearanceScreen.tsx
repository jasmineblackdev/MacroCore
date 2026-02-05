import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface AppearanceScreenProps {
  onBack: () => void;
}

const themes = [
  { id: "dark", label: "Dark", description: "Easy on the eyes", icon: "🌙" },
  { id: "light", label: "Light", description: "Clean and bright", icon: "☀️" },
  { id: "system", label: "System", description: "Match your device", icon: "📱" },
];

const accentColors = [
  { id: "blue", color: "#0A84FF", label: "Core Blue" },
  { id: "teal", color: "#2AC8B8", label: "Teal" },
  { id: "purple", color: "#6E5AE6", label: "Purple" },
  { id: "orange", color: "#FF9F0A", label: "Orange" },
];

export const AppearanceScreen = ({ onBack }: AppearanceScreenProps) => {
  const [selectedTheme, setSelectedTheme] = useState("dark");
  const [selectedAccent, setSelectedAccent] = useState("blue");

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    toast.success(`Theme changed to ${themeId}`);
  };

  const handleAccentChange = (accentId: string) => {
    setSelectedAccent(accentId);
    toast.success("Accent color updated");
  };

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
        <h1 className="text-xl font-semibold text-foreground">Appearance</h1>
      </header>

      <div className="p-4 space-y-6">
        {/* Theme Selection */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Theme
          </h3>
          <div className="space-y-2">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-xl border transition-colors",
                  selectedTheme === theme.id
                    ? "bg-primary/10 border-primary"
                    : "bg-card border-border/30 hover:bg-accent"
                )}
              >
                <span className="text-2xl">{theme.icon}</span>
                <div className="flex-1 text-left">
                  <p className="font-medium text-foreground">{theme.label}</p>
                  <p className="text-sm text-muted-foreground">{theme.description}</p>
                </div>
                {selectedTheme === theme.id && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Accent Color */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Accent Color
          </h3>
          <div className="flex gap-3">
            {accentColors.map((accent) => (
              <button
                key={accent.id}
                onClick={() => handleAccentChange(accent.id)}
                className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center transition-transform",
                  selectedAccent === accent.id && "ring-2 ring-offset-2 ring-offset-background ring-foreground scale-110"
                )}
                style={{ backgroundColor: accent.color }}
              >
                {selectedAccent === accent.id && (
                  <Check className="w-6 h-6 text-white" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Font Size
          </h3>
          <div className="flex gap-2">
            {["Small", "Medium", "Large"].map((size) => (
              <button
                key={size}
                className={cn(
                  "flex-1 py-3 rounded-xl text-sm font-medium transition-colors",
                  size === "Medium"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border/30 text-foreground hover:bg-accent"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
