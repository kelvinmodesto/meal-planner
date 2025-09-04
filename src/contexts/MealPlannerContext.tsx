import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

export interface Meal {
  id: number;
  name: string;
  type: "breakfast" | "lunch" | "dinner";
  cookTime: number;
  servings: number;
  calories?: number;
  difficulty?: "Easy" | "Medium" | "Hard";
  image?: string;
}

export interface WeekPlan {
  [dateKey: string]: Meal[];
}

export interface MealPlanStats {
  totalMeals: number;
  plannedDays: number;
  averageCookTime: number;
  totalCalories: number;
}

interface MealPlannerState {
  currentWeek: Date;
  weekPlan: WeekPlan;
  availableMeals: Meal[];
  stats: MealPlanStats;
  isLoading: boolean;
}

interface MealPlannerContextType {
  state: MealPlannerState;
  setCurrentWeek: (date: Date) => void;
  clearWeek: () => void;
  getWeekDates: (date: Date) => Date[];
  getDateKey: (date: Date) => string;
  getMealsForDay: (dateKey: string) => Meal[];
  addMealToDay: (
    dateKey: string,
    mealType: "breakfast" | "lunch" | "dinner",
  ) => void;
  removeMealFromDay: (
    dateKey: string,
    mealType: "breakfast" | "lunch" | "dinner",
    mealId: string,
  ) => void;
  getAvailableMealsByType: (type: "breakfast" | "lunch" | "dinner") => Meal[];
}

const MealPlannerContext = createContext<MealPlannerContextType | undefined>(
  undefined,
);

// Mock data
const mockAvailableMeals: Meal[] = [
  {
    id: 1,
    name: "Chicken Tikka Masala",
    type: "dinner",
    cookTime: 45,
    servings: 4,
    calories: 420,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400",
  },
  {
    id: 2,
    name: "Mediterranean Quinoa Bowl",
    type: "lunch",
    cookTime: 25,
    servings: 2,
    calories: 350,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
  },
  {
    id: 3,
    name: "Overnight Oats",
    type: "breakfast",
    cookTime: 5,
    servings: 1,
    calories: 280,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
  },
];

const mockStats: MealPlanStats = {
  totalMeals: 12,
  plannedDays: 5,
  averageCookTime: 35,
  totalCalories: 8400,
};

const mockWeekPlan: WeekPlan = {
  "2024-01-15": [
    {
      id: 1,
      name: "Overnight Oats",
      type: "breakfast",
      cookTime: 5,
      servings: 1,
      calories: 280,
      difficulty: "Easy",
    },
  ],
  "2024-01-16": [
    {
      id: 2,
      name: "Mediterranean Quinoa Bowl",
      type: "lunch",
      cookTime: 25,
      servings: 2,
      calories: 350,
      difficulty: "Easy",
    },
  ],
};

export function MealPlannerProvider({ children }: { children: ReactNode }) {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [weekPlan, setWeekPlan] = useState<WeekPlan>(mockWeekPlan);

  const state: MealPlannerState = {
    currentWeek,
    weekPlan,
    availableMeals: mockAvailableMeals,
    stats: mockStats,
    isLoading: false,
  };

  const clearWeek = () => {
    setWeekPlan({});
  };

  const getWeekDates = (date: Date): Date[] => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const getDateKey = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const getMealsForDay = (dateKey: string): Meal[] => {
    return weekPlan[dateKey] || [];
  };

  const addMealToDay = (
    dateKey: string,
    mealType: "breakfast" | "lunch" | "dinner",
  ) => {
    const availableMeals = mockAvailableMeals.filter(
      (meal) => meal.type === mealType,
    );
    if (availableMeals.length > 0) {
      const randomMeal =
        availableMeals[Math.floor(Math.random() * availableMeals.length)];
      setWeekPlan((prev) => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), randomMeal],
      }));
    }
  };

  const removeMealFromDay = (
    dateKey: string,
    mealType: "breakfast" | "lunch" | "dinner",
    mealId: string,
  ) => {
    setWeekPlan((prev) => ({
      ...prev,
      [dateKey]: (prev[dateKey] || []).filter(
        (meal) => meal.id.toString() !== mealId,
      ),
    }));
  };

  const getAvailableMealsByType = (
    type: "breakfast" | "lunch" | "dinner",
  ): Meal[] => {
    return mockAvailableMeals.filter((meal) => meal.type === type);
  };

  const contextValue: MealPlannerContextType = {
    state,
    setCurrentWeek,
    clearWeek,
    getWeekDates,
    getDateKey,
    getMealsForDay,
    addMealToDay,
    removeMealFromDay,
    getAvailableMealsByType,
  };

  return (
    <MealPlannerContext.Provider value={contextValue}>
      {children}
    </MealPlannerContext.Provider>
  );
}

export function useMealPlanner() {
  const context = useContext(MealPlannerContext);
  if (context === undefined) {
    throw new Error("useMealPlanner must be used within a MealPlannerProvider");
  }
  return context;
}
