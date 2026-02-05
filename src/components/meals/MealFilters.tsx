import { cn } from "@/lib/utils";

interface MealFiltersProps {
  selectedDiet: string;
  selectedMealType: string;
  onDietChange: (diet: string) => void;
  onMealTypeChange: (type: string) => void;
}

const dietOptions = [
  { value: "all", label: "All" },
  { value: "omnivore", label: "🥩 Meat" },
  { value: "vegetarian", label: "🥬 Veggie" },
  { value: "vegan", label: "🌱 Vegan" },
  { value: "pescatarian", label: "🐟 Pesc" },
];

const mealTypeOptions = [
  { value: "all", label: "All Meals" },
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
  { value: "snack", label: "Snack" },
];

export const MealFilters = ({
  selectedDiet,
  selectedMealType,
  onDietChange,
  onMealTypeChange,
}: MealFiltersProps) => {
  return (
    <div className="space-y-3">
      {/* Diet Type Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {dietOptions.map((diet) => (
          <button
            key={diet.value}
            onClick={() => onDietChange(diet.value)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              selectedDiet === diet.value
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border/30 text-muted-foreground hover:text-foreground"
            )}
          >
            {diet.label}
          </button>
        ))}
      </div>

      {/* Meal Type Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {mealTypeOptions.map((type) => (
          <button
            key={type.value}
            onClick={() => onMealTypeChange(type.value)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              selectedMealType === type.value
                ? "bg-secondary text-secondary-foreground"
                : "bg-card border border-border/30 text-muted-foreground hover:text-foreground"
            )}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
};
