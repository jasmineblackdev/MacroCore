import { useState } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { MealBrowserCard, MealData } from "@/components/meals/MealBrowserCard";
import { MealFilters } from "@/components/meals/MealFilters";
import { mockMeals } from "@/data/mockMeals";
import { Search } from "lucide-react";
import { toast } from "sonner";

const Meals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDiet, setSelectedDiet] = useState("all");
  const [selectedMealType, setSelectedMealType] = useState("all");
  const [meals, setMeals] = useState<MealData[]>(mockMeals);

  const filteredMeals = meals.filter((meal) => {
    const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiet = selectedDiet === "all" || meal.dietType === selectedDiet;
    const matchesMealType = selectedMealType === "all" || meal.mealType === selectedMealType;
    return matchesSearch && matchesDiet && matchesMealType;
  });

  const handleAddMeal = (meal: MealData) => {
    setMeals(prev => prev.map(m => 
      m.id === meal.id ? { ...m, isAdded: !m.isAdded } : m
    ));
    
    if (!meal.isAdded) {
      toast.success(`${meal.name} added to your log!`, {
        description: `${meal.protein}g protein • ${meal.calories} calories`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background border-b border-border/30">
        <div className="px-4 py-4">
          <h1 className="text-xl font-semibold text-foreground mb-3">Meals</h1>
          
          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search meals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-card border-border/30"
            />
          </div>

          {/* Filters */}
          <MealFilters
            selectedDiet={selectedDiet}
            selectedMealType={selectedMealType}
            onDietChange={setSelectedDiet}
            onMealTypeChange={setSelectedMealType}
          />
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-220px-80px)]">
        <div className="p-4">
          <p className="text-sm text-muted-foreground mb-3">
            {filteredMeals.length} meals found
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            {filteredMeals.map((meal, index) => (
              <MealBrowserCard
                key={meal.id}
                meal={meal}
                onAdd={handleAddMeal}
                delay={index * 0.05}
              />
            ))}
          </div>

          {filteredMeals.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <span className="text-5xl mb-4">🔍</span>
              <h3 className="text-lg font-semibold text-foreground">No meals found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>
      </ScrollArea>

      <BottomNav />
    </div>
  );
};

export default Meals;
