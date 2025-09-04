export interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  cuisine: string;
  cookTime: number;
  servings: number;
  rating: number;
  difficulty: "Easy" | "Medium" | "Hard";
  dietaryRestrictions: string[];
  ingredients: string[];
  instructions: string[];
  calories: number;
  prepTime: number;
}

export interface Meal {
  id: string;
  name: string;
  cookTime: number;
  servings: number;
  type: "breakfast" | "lunch" | "dinner";
  recipeId?: number;
}

export interface DayMeals {
  breakfast: Meal[];
  lunch: Meal[];
  dinner: Meal[];
}

export interface WeekPlan {
  [dateKey: string]: DayMeals;
}

export interface ShoppingListItem {
  id: string;
  name: string;
  category: string;
  price: number;
  completed: boolean;
  quantity?: number;
  unit?: string;
}

export interface Category {
  name: string;
  color: string;
  icon: string;
}

export interface CategoryInputs {
  [categoryName: string]: {
    name: string;
    price: string;
  };
}

export interface EditValues {
  name: string;
  price: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sodium?: number;
}

export interface MealPlanSummary {
  totalMeals: number;
  plannedDays: number;
  averageCookTime: number;
  totalCalories: number;
}

export interface ShoppingSummary {
  totalItems: number;
  completedItems: number;
  totalCost: number;
  remainingCost: number;
}

export interface DashboardStats {
  totalRecipes: number;
  weeklyMeals: number;
  shoppingItems: number;
  averageCookTime: string;
}

export interface Activity {
  title: string;
  time: string;
  icon: React.ReactElement;
}

export interface QuickAction {
  to: string;
  icon: React.ReactElement;
  title: string;
  description: string;
}

export interface FilterOptions {
  searchTerm: string;
  selectedCuisine: string;
  selectedDietary: string;
  maxCookTime: string;
  sortBy: string;
}

export type MealType = "breakfast" | "lunch" | "dinner";
export type DietaryRestriction =
  | "Vegetarian"
  | "Vegan"
  | "Gluten-Free"
  | "Dairy-Free"
  | "Keto"
  | "Paleo";
export type CuisineType =
  | "Italian"
  | "Mexican"
  | "Asian"
  | "Indian"
  | "Mediterranean"
  | "American"
  | "Thai"
  | "Korean"
  | "Fusion";
export type DifficultyLevel = "Easy" | "Medium" | "Hard";
export type ActionVariant = "primary" | "secondary" | "danger";
export type ActionIconVariant = "edit" | "delete" | "save" | "cancel";
