import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

export interface ShoppingListItem {
  id: string;
  name: string;
  category: string;
  price: number;
  completed: boolean;
  quantity: number;
  unit?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

interface ShoppingListState {
  items: ShoppingListItem[];
  categories: Category[];
  availableIngredients: ShoppingListItem[];
}

interface ShoppingListContextType {
  state: ShoppingListState;
  addItem: (item: Omit<ShoppingListItem, "id">) => void;
  updateItem: (id: string, updates: Partial<ShoppingListItem>) => void;
  deleteItem: (id: string) => void;
  toggleItem: (id: string) => void;
  clearCompleted: () => void;
  clearAll: () => void;
  generateFromMealPlan: () => void;
  addIngredientToCart: (ingredient: ShoppingListItem) => void;
  getItemsByCategory: (categoryName: string) => ShoppingListItem[];
  getTotalCost: () => number;
  getCompletedCount: () => number;
  getRemainingCost: () => number;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(
  undefined,
);

// Mock data
const mockItems: ShoppingListItem[] = [
  {
    id: "1",
    name: "Chicken Breast",
    category: "Meat",
    quantity: 2,
    price: 12.99,
    completed: false,
    unit: "lbs",
  },
  {
    id: "2",
    name: "Quinoa",
    category: "Grains",
    quantity: 1,
    price: 4.99,
    completed: true,
    unit: "cup",
  },
  {
    id: "3",
    name: "Bell Peppers",
    category: "Vegetables",
    quantity: 3,
    price: 5.99,
    completed: false,
    unit: "pieces",
  },
  {
    id: "4",
    name: "Greek Yogurt",
    category: "Dairy",
    quantity: 1,
    price: 6.99,
    completed: false,
    unit: "32 oz",
  },
];

const mockCategories: Category[] = [
  { id: "meat", name: "Meat", color: "#ef4444" },
  { id: "vegetables", name: "Vegetables", color: "#22c55e" },
  { id: "dairy", name: "Dairy", color: "#3b82f6" },
  { id: "grains", name: "Grains", color: "#f59e0b" },
];

const mockAvailableIngredients: ShoppingListItem[] = [
  {
    id: "1",
    name: "Tomatoes",
    category: "Vegetables",
    quantity: 1,
    price: 3.99,
    completed: false,
    unit: "lb",
  },
  {
    id: "2",
    name: "Onions",
    category: "Vegetables",
    quantity: 2,
    price: 2.49,
    completed: false,
    unit: "lbs",
  },
  {
    id: "3",
    name: "Ground Turkey",
    category: "Meat",
    quantity: 1,
    price: 8.99,
    completed: false,
    unit: "lb",
  },
  {
    id: "4",
    name: "Brown Rice",
    category: "Grains",
    quantity: 1,
    price: 3.99,
    completed: false,
    unit: "bag",
  },
];

export function ShoppingListProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ShoppingListItem[]>(mockItems);
  const [categories] = useState<Category[]>(mockCategories);
  const [availableIngredients] = useState<ShoppingListItem[]>(
    mockAvailableIngredients,
  );

  const state: ShoppingListState = {
    items,
    categories,
    availableIngredients,
  };

  const addItem = (item: Omit<ShoppingListItem, "id">) => {
    const newItem: ShoppingListItem = {
      ...item,
      id: Date.now().toString(),
    };
    setItems((prev) => [...prev, newItem]);
  };

  const updateItem = (id: string, updates: Partial<ShoppingListItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    );
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const clearCompleted = () => {
    setItems((prev) => prev.filter((item) => !item.completed));
  };

  const clearAll = () => {
    setItems([]);
  };

  const generateFromMealPlan = () => {
    // Mock function - would generate items from meal plan
    console.log("Generate from meal plan");
  };

  const addIngredientToCart = (ingredient: ShoppingListItem) => {
    const newItem: ShoppingListItem = {
      ...ingredient,
      id: Date.now().toString(),
      completed: false,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const getItemsByCategory = (categoryName: string): ShoppingListItem[] => {
    return items.filter((item) => item.category === categoryName);
  };

  const getTotalCost = (): number => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCompletedCount = (): number => {
    return items.filter((item) => item.completed).length;
  };

  const getRemainingCost = (): number => {
    return items
      .filter((item) => !item.completed)
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const contextValue: ShoppingListContextType = {
    state,
    addItem,
    updateItem,
    deleteItem,
    toggleItem,
    clearCompleted,
    clearAll,
    generateFromMealPlan,
    addIngredientToCart,
    getItemsByCategory,
    getTotalCost,
    getCompletedCount,
    getRemainingCost,
  };

  return (
    <ShoppingListContext.Provider value={contextValue}>
      {children}
    </ShoppingListContext.Provider>
  );
}

export function useShoppingList() {
  const context = useContext(ShoppingListContext);
  if (context === undefined) {
    throw new Error(
      "useShoppingList must be used within a ShoppingListProvider",
    );
  }
  return context;
}
