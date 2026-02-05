import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, TrendingUp, AlertCircle, CheckCircle, Loader2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNutritionAI, MacroAnalysis, UserProfile, CurrentMacros } from "@/hooks/useNutritionAI";
import { cn } from "@/lib/utils";

interface MacroInsightsCardProps {
  userProfile: UserProfile;
  currentMacros: CurrentMacros;
}

export const MacroInsightsCard = ({ userProfile, currentMacros }: MacroInsightsCardProps) => {
  const [analysis, setAnalysis] = useState<MacroAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { analyzeMacros } = useNutritionAI();

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    const result = await analyzeMacros(userProfile, currentMacros);
    if (result) {
      setAnalysis(result);
    }
    setIsAnalyzing(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "optimal":
        return <CheckCircle className="w-4 h-4 text-protein-teal" />;
      case "needs-attention":
        return <AlertCircle className="w-4 h-4 text-carb-amber" />;
      case "critical":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-protein-teal";
    if (score >= 60) return "text-carb-amber";
    return "text-destructive";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl bg-card border border-border/30"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">AI Macro Analysis</h3>
        </div>
        {!analysis && (
          <Button
            size="sm"
            variant="outline"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin mr-1" />
                Analyzing
              </>
            ) : (
              <>
                Analyze
                <ChevronRight className="w-3 h-3 ml-1" />
              </>
            )}
          </Button>
        )}
      </div>

      <AnimatePresence>
        {isAnalyzing && !analysis && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center py-6"
          >
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
            <p className="text-sm text-muted-foreground">Analyzing your nutrition...</p>
          </motion.div>
        )}

        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Score */}
            <div className="flex items-center justify-center py-3">
              <div className="text-center">
                <span className={cn("text-4xl font-bold", getScoreColor(analysis.score))}>
                  {analysis.score}
                </span>
                <span className="text-lg text-muted-foreground">/100</span>
                <p className="text-sm text-muted-foreground mt-1">Nutrition Score</p>
              </div>
            </div>

            {/* Macro Balance */}
            <div className="flex justify-around py-2 px-4 rounded-lg bg-background">
              <div className="text-center">
                <span className="text-lg font-semibold text-protein-teal">
                  {analysis.macroBalance.proteinRatio}%
                </span>
                <p className="text-xs text-muted-foreground">Protein</p>
              </div>
              <div className="text-center">
                <span className="text-lg font-semibold text-carb-amber">
                  {analysis.macroBalance.carbsRatio}%
                </span>
                <p className="text-xs text-muted-foreground">Carbs</p>
              </div>
              <div className="text-center">
                <span className="text-lg font-semibold text-fat-plum">
                  {analysis.macroBalance.fatsRatio}%
                </span>
                <p className="text-xs text-muted-foreground">Fats</p>
              </div>
            </div>

            {/* Insights */}
            <div className="space-y-2">
              {analysis.insights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "p-3 rounded-lg border",
                    insight.status === "optimal" && "bg-protein-teal/5 border-protein-teal/20",
                    insight.status === "needs-attention" && "bg-carb-amber/5 border-carb-amber/20",
                    insight.status === "critical" && "bg-destructive/5 border-destructive/20"
                  )}
                >
                  <div className="flex items-start gap-2">
                    {getStatusIcon(insight.status)}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{insight.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{insight.recommendation}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Refresh Button */}
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Refresh Analysis
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {!analysis && !isAnalyzing && (
        <p className="text-sm text-muted-foreground text-center py-4">
          Get AI-powered insights on your macro distribution
        </p>
      )}
    </motion.div>
  );
};
