import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

export interface DashboardStats {
  totalRecipes: number;
  weeklyMeals: number;
  shoppingItems: number;
  averageCookTime: number;
}

export interface Activity {
  id: number;
  title: string;
  time: string;
  type: "recipe" | "meal" | "shopping";
  icon: string;
}

export interface QuickAction {
  id: number;
  title: string;
  description: string;
  icon: string;
  path: string;
  color: string;
}

interface DashboardState {
  stats: DashboardStats;
  recentActivities: Activity[];
  quickActions: QuickAction[];
  isLoading: boolean;
}

interface DashboardContextType {
  state: DashboardState;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

// Mock data
const mockStats: DashboardStats = {
  totalRecipes: 8,
  weeklyMeals: 12,
  shoppingItems: 15,
  averageCookTime: 32,
};

const mockActivities: Activity[] = [
  {
    id: 1,
    title: "Added Chicken Tikka Masala to recipes",
    time: "2 hours ago",
    type: "recipe",
    icon: "🍗",
  },
  {
    id: 2,
    title: "Planned Mediterranean Bowl for dinner",
    time: "4 hours ago",
    type: "meal",
    icon: "📅",
  },
  {
    id: 3,
    title: "Completed weekly groceries shopping",
    time: "1 day ago",
    type: "shopping",
    icon: "🛒",
  },
];

const mockQuickActions: QuickAction[] = [
  {
    id: 1,
    title: "Browse Recipes",
    description: "Discover new recipes and favorites",
    icon: "👨‍🍳",
    path: "/recipes",
    color: "#667eea",
  },
  {
    id: 2,
    title: "Plan Your Week",
    description: "Set up your meal plan",
    icon: "📅",
    path: "/meal-planner",
    color: "#764ba2",
  },
  {
    id: 3,
    title: "Shopping List",
    description: "Manage your grocery list",
    icon: "🛒",
    path: "/shopping-list",
    color: "#f093fb",
  },
];

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [state] = useState<DashboardState>({
    stats: mockStats,
    recentActivities: mockActivities,
    quickActions: mockQuickActions,
    isLoading: false,
  });

  return (
    <DashboardContext.Provider value={{ state }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
