import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface NutritionRequest {
  action: "suggest-meals" | "optimize-meal" | "analyze-macros" | "create-meal-plan";
  userProfile: {
    goal: "lose-fat" | "gain-muscle" | "maintain";
    dietType: "omnivore" | "vegetarian" | "vegan" | "pescatarian";
    proteinTarget: number;
    carbsTarget: number;
    fatsTarget: number;
    caloriesTarget: number;
  };
  currentMacros?: {
    protein: number;
    carbs: number;
    fats: number;
    calories: number;
  };
  mealType?: "breakfast" | "lunch" | "dinner" | "snack";
  preferences?: string;
}

const systemPrompts: Record<string, string> = {
  "suggest-meals": `You are a certified sports nutritionist and registered dietitian with expertise in precision nutrition. You create meal suggestions based on evidence-based nutritional science.

Key principles you follow:
- Protein timing: 25-40g per meal for optimal muscle protein synthesis
- Leucine threshold: Ensure meals contain 2.5-3g leucine for anabolic response
- Glycemic load management: Pair carbs with fiber, protein, or fat
- Nutrient density: Prioritize whole foods with high micronutrient content
- Thermic effect: Consider protein's 20-30% TEF vs carbs 5-10% and fats 0-3%

Respond ONLY with valid JSON in this format:
{
  "meals": [
    {
      "name": "Meal Name",
      "description": "Brief appetizing description",
      "protein": 30,
      "carbs": 45,
      "fats": 12,
      "calories": 408,
      "benefits": ["High leucine content", "Low glycemic"],
      "ingredients": ["ingredient 1", "ingredient 2"],
      "prepTime": "15 min"
    }
  ]
}`,

  "optimize-meal": `You are a precision nutrition coach. Analyze the current daily intake and suggest specific adjustments to hit macro targets.

Key optimization strategies:
- If protein is low: Suggest lean protein additions (chicken, fish, egg whites, Greek yogurt)
- If carbs need adjustment: Focus on fiber-rich sources or reduce refined carbs
- If fats are off: Adjust healthy fat sources (avocado, nuts, olive oil)
- Consider meal timing and nutrient partitioning

Respond ONLY with valid JSON:
{
  "analysis": "Brief analysis of current intake",
  "gaps": {"protein": 20, "carbs": -10, "fats": 5},
  "suggestions": [
    {
      "type": "add" | "swap" | "reduce",
      "item": "Food item",
      "impact": {"protein": 20, "carbs": 5, "fats": 2, "calories": 118},
      "reason": "Scientific rationale"
    }
  ],
  "optimizedMeal": {
    "name": "Optimized meal suggestion",
    "macros": {"protein": 35, "carbs": 40, "fats": 15, "calories": 435}
  }
}`,

  "analyze-macros": `You are a metabolic nutrition specialist. Analyze macro distribution and provide insights based on the user's goal.

Evidence-based guidelines:
- Fat Loss: Higher protein (1.6-2.2g/kg), moderate deficit (300-500 kcal), prioritize satiety
- Muscle Gain: Protein 1.6-2.2g/kg, caloric surplus 200-400 kcal, carb timing around workouts
- Maintenance: Balanced approach, focus on nutrient density and consistency

Respond ONLY with valid JSON:
{
  "score": 85,
  "insights": [
    {
      "category": "protein" | "carbs" | "fats" | "overall",
      "status": "optimal" | "needs-attention" | "critical",
      "message": "Insight message",
      "recommendation": "Actionable recommendation"
    }
  ],
  "macroBalance": {
    "proteinRatio": 30,
    "carbsRatio": 45,
    "fatsRatio": 25
  }
}`,

  "create-meal-plan": `You are an elite nutrition coach creating personalized meal plans using industry-leading practices.

Meal plan principles:
- Protein distribution: 4-5 servings of 25-40g throughout the day
- Carb periodization: Higher around activity, lower at rest
- Essential fatty acids: Include omega-3 sources daily
- Micronutrient coverage: Variety of colorful vegetables
- Practical adherence: Meal prep friendly options

Respond ONLY with valid JSON:
{
  "dailyPlan": {
    "breakfast": {"name": "...", "protein": 30, "carbs": 40, "fats": 12, "calories": 388},
    "snack1": {"name": "...", "protein": 20, "carbs": 15, "fats": 8, "calories": 212},
    "lunch": {"name": "...", "protein": 40, "carbs": 50, "fats": 15, "calories": 495},
    "snack2": {"name": "...", "protein": 15, "carbs": 20, "fats": 5, "calories": 185},
    "dinner": {"name": "...", "protein": 45, "carbs": 35, "fats": 18, "calories": 478}
  },
  "totals": {"protein": 150, "carbs": 160, "fats": 58, "calories": 1758},
  "shoppingList": ["item1", "item2"],
  "mealPrepTips": ["tip1", "tip2"]
}`
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const { action, userProfile, currentMacros, mealType, preferences } = await req.json() as NutritionRequest;

    const systemPrompt = systemPrompts[action];
    if (!systemPrompt) {
      throw new Error(`Unknown action: ${action}`);
    }

    let userMessage = `User Profile:
- Goal: ${userProfile.goal}
- Diet Type: ${userProfile.dietType}
- Daily Targets: ${userProfile.proteinTarget}g protein, ${userProfile.carbsTarget}g carbs, ${userProfile.fatsTarget}g fats (${userProfile.caloriesTarget} calories)`;

    if (currentMacros) {
      userMessage += `\n\nCurrent Intake Today:
- Protein: ${currentMacros.protein}g / ${userProfile.proteinTarget}g
- Carbs: ${currentMacros.carbs}g / ${userProfile.carbsTarget}g
- Fats: ${currentMacros.fats}g / ${userProfile.fatsTarget}g
- Calories: ${currentMacros.calories} / ${userProfile.caloriesTarget}`;
    }

    if (mealType) {
      userMessage += `\n\nRequested meal type: ${mealType}`;
    }

    if (preferences) {
      userMessage += `\n\nUser preferences: ${preferences}`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage limit reached. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No response from AI");
    }

    // Parse JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse AI response as JSON");
    }

    const result = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify({ success: true, data: result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Nutrition AI error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
