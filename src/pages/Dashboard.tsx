import { ScrollArea } from "@/components/ui/scroll-area";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MacroHeroCard } from "@/components/dashboard/MacroHeroCard";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { MealCard } from "@/components/dashboard/MealCard";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { BottomNav } from "@/components/layout/BottomNav";

// Mock data - in a real app this would come from state/API
const mockMacros = {
  proteinCurrent: 152,
  proteinTarget: 180,
  carbsCurrent: 180,
  carbsTarget: 220,
  fatsCurrent: 55,
  fatsTarget: 65,
  caloriesCurrent: 1820,
  caloriesTarget: 2200,
};

const mockMeals = [
  {
    type: "Breakfast" as const,
    name: "Protein Overnight Oats",
    protein: 28,
    carbs: 45,
    fats: 12,
    calories: 396,
    isLogged: true,
  },
  {
    type: "Lunch" as const,
    name: "Grilled Chicken Salad",
    protein: 42,
    carbs: 18,
    fats: 14,
    calories: 366,
    isLogged: true,
  },
  {
    type: "Dinner" as const,
    isLogged: false,
  },
  {
    type: "Snack" as const,
    isLogged: false,
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <DashboardHeader userName="Jasmine" />

      {/* Scrollable Content */}
      <ScrollArea className="h-[calc(100vh-64px-80px)]">
        <div className="pb-8">
          {/* Hero Macro Card */}
          <MacroHeroCard {...mockMacros} />

          {/* Quick Stats */}
          <QuickStats currentWeight={142.6} weightChange={-0.4} streak={12} />

          {/* Meals Section */}
          <section className="mt-6 px-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Your Meals Today
            </h2>
            <div className="space-y-3">
              {mockMeals.map((meal, index) => (
                <MealCard
                  key={meal.type}
                  type={meal.type}
                  name={meal.name}
                  protein={meal.protein}
                  carbs={meal.carbs}
                  fats={meal.fats}
                  calories={meal.calories}
                  isLogged={meal.isLogged}
                  delay={0.3 + index * 0.1}
                />
              ))}
            </div>
          </section>

          {/* Insights Section */}
          <section className="mt-6 px-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Insights
            </h2>
            <div className="space-y-3">
              <InsightCard
                icon="💪"
                headline="You're on a roll!"
                body="You've hit your protein target 12 days in a row. Keep going!"
                variant="protein"
                ctaText="View Streak"
                onAction={() => {}}
                delay={0.6}
              />
              <InsightCard
                icon="📉"
                headline="Progress Update"
                body="You're down 2.4 lbs this week. Your plan is working!"
                variant="primary"
                ctaText="See Trends"
                onAction={() => {}}
                onDismiss={() => {}}
                delay={0.7}
              />
            </div>
          </section>
        </div>
      </ScrollArea>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Dashboard;
