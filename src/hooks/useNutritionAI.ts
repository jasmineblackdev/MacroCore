import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface UserProfile {
  goal: "lose-fat" | "gain-muscle" | "maintain";
  dietType: "omnivore" | "vegetarian" | "vegan" | "pescatarian";
  proteinTarget: number;
  carbsTarget: number;
  fatsTarget: number;
  caloriesTarget: number;
}

export interface CurrentMacros {
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
}

export interface SuggestedMeal {
  name: string;
  description: string;
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
  benefits: string[];
  ingredients: string[];
  prepTime: string;
}

export interface MacroOptimization {
  type: "add" | "swap" | "reduce";
  item: string;
  impact: { protein: number; carbs: number; fats: number; calories: number };
  reason: string;
}

export interface MacroAnalysis {
  score: number;
  insights: {
    category: "protein" | "carbs" | "fats" | "overall";
    status: "optimal" | "needs-attention" | "critical";
    message: string;
    recommendation: string;
  }[];
  macroBalance: {
    proteinRatio: number;
    carbsRatio: number;
    fatsRatio: number;
  };
}

export interface DailyMealPlan {
  dailyPlan: {
    breakfast: { name: string; protein: number; carbs: number; fats: number; calories: number };
    snack1: { name: string; protein: number; carbs: number; fats: number; calories: number };
    lunch: { name: string; protein: number; carbs: number; fats: number; calories: number };
    snack2: { name: string; protein: number; carbs: number; fats: number; calories: number };
    dinner: { name: string; protein: number; carbs: number; fats: number; calories: number };
  };
  totals: { protein: number; carbs: number; fats: number; calories: number };
  shoppingList: string[];
  mealPrepTips: string[];
}

export const useNutritionAI = () => {
  const [isLoading, setIsLoading] = useState(false);

  const callNutritionAI = async <T>(
    action: "suggest-meals" | "optimize-meal" | "analyze-macros" | "create-meal-plan",
    userProfile: UserProfile,
    options?: {
      currentMacros?: CurrentMacros;
      mealType?: "breakfast" | "lunch" | "dinner" | "snack";
      preferences?: string;
    }
  ): Promise<T | null> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("nutrition-ai", {
        body: {
          action,
          userProfile,
          ...options,
        },
      });

      if (error) {
        console.error("Nutrition AI error:", error);
        toast.error("Failed to get AI recommendations");
        return null;
      }

      if (!data.success) {
        toast.error(data.error || "AI request failed");
        return null;
      }

      return data.data as T;
    } catch (err) {
      console.error("Nutrition AI error:", err);
      toast.error("Something went wrong with AI");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const suggestMeals = async (
    userProfile: UserProfile,
    mealType?: "breakfast" | "lunch" | "dinner" | "snack",
    preferences?: string
  ) => {
    return callNutritionAI<{ meals: SuggestedMeal[] }>("suggest-meals", userProfile, {
      mealType,
      preferences,
    });
  };

  const optimizeMeal = async (
    userProfile: UserProfile,
    currentMacros: CurrentMacros
  ) => {
    return callNutritionAI<{
      analysis: string;
      gaps: { protein: number; carbs: number; fats: number };
      suggestions: MacroOptimization[];
      optimizedMeal: { name: string; macros: CurrentMacros };
    }>("optimize-meal", userProfile, { currentMacros });
  };

  const analyzeMacros = async (
    userProfile: UserProfile,
    currentMacros: CurrentMacros
  ) => {
    return callNutritionAI<MacroAnalysis>("analyze-macros", userProfile, { currentMacros });
  };

  const createMealPlan = async (
    userProfile: UserProfile,
    preferences?: string
  ) => {
    return callNutritionAI<DailyMealPlan>("create-meal-plan", userProfile, { preferences });
  };

  return {
    isLoading,
    suggestMeals,
    optimizeMeal,
    analyzeMacros,
    createMealPlan,
  };
};
