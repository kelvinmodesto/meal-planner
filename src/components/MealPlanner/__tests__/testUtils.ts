import type { Meal, WeekPlan, MealPlanStats, MealPlannerState } from "@/contexts/MealPlannerContext";

// Mock meal data for testing
export const createMockMeal = (overrides: Partial<Meal> = {}): Meal => ({
  id: 1,
  name: "Test Meal",
  type: "breakfast",
  cookTime: 15,
  servings: 2,
  calories: 350,
  ingredients: ["ingredient1", "ingredient2"],
  instructions: "Test cooking instructions",
  tags: ["test", "quick"],
  difficulty: "easy",
  prepTime: 5,
  imageUrl: "https://example.com/test-meal.jpg",
  ...overrides,
});

// Mock meals for different meal types
export const mockBreakfastMeal = createMockMeal({
  id: 1,
  name: "Scrambled Eggs with Toast",
  type: "breakfast",
  cookTime: 10,
  calories: 300,
  ingredients: ["eggs", "bread", "butter"],
});

export const mockLunchMeal = createMockMeal({
  id: 2,
  name: "Caesar Salad with Chicken",
  type: "lunch",
  cookTime: 20,
  calories: 450,
  ingredients: ["chicken breast", "romaine lettuce", "caesar dressing"],
});

export const mockDinnerMeal = createMockMeal({
  id: 3,
  name: "Beef Stir Fry",
  type: "dinner",
  cookTime: 25,
  calories: 520,
  ingredients: ["beef strips", "mixed vegetables", "soy sauce"],
});

// Mock week plan data
export const createMockWeekPlan = (overrides: Partial<WeekPlan> = {}): WeekPlan => ({
  "2024-01-15": [mockBreakfastMeal, mockLunchMeal],
  "2024-01-16": [mockDinnerMeal],
  "2024-01-17": [],
  ...overrides,
});

// Empty week plan
export const emptyWeekPlan: WeekPlan = {};

// Full week plan with meals for every day
export const fullWeekPlan: WeekPlan = {
  "2024-01-14": [mockBreakfastMeal],
  "2024-01-15": [mockBreakfastMeal, mockLunchMeal],
  "2024-01-16": [mockDinnerMeal],
  "2024-01-17": [mockBreakfastMeal, mockDinnerMeal],
  "2024-01-18": [mockLunchMeal],
  "2024-01-19": [mockBreakfastMeal, mockLunchMeal, mockDinnerMeal],
  "2024-01-20": [mockDinnerMeal],
};

// Mock stats data
export const createMockStats = (overrides: Partial<MealPlanStats> = {}): MealPlanStats => ({
  totalMeals: 10,
  plannedDays: 5,
  averageCookTime: 20,
  totalCalories: 3500,
  ...overrides,
});

export const emptyStats: MealPlanStats = {
  totalMeals: 0,
  plannedDays: 0,
  averageCookTime: 0,
  totalCalories: 0,
};

export const largeStats: MealPlanStats = {
  totalMeals: 150,
  plannedDays: 30,
  averageCookTime: 45,
  totalCalories: 75000,
};

// Mock meal planner state
export const createMockMealPlannerState = (overrides: Partial<MealPlannerState> = {}): MealPlannerState => ({
  currentWeek: new Date("2024-01-15"),
  weekPlan: createMockWeekPlan(),
  stats: createMockStats(),
  isLoading: false,
  error: null,
  ...overrides,
});

export const loadingState: MealPlannerState = createMockMealPlannerState({
  isLoading: true,
});

export const errorState: MealPlannerState = createMockMealPlannerState({
  isLoading: false,
  error: "Failed to load meal plan data",
});

// Date utilities for testing
export const testDates = {
  monday: new Date("2024-01-15"),
  tuesday: new Date("2024-01-16"),
  wednesday: new Date("2024-01-17"),
  thursday: new Date("2024-01-18"),
  friday: new Date("2024-01-19"),
  saturday: new Date("2024-01-20"),
  sunday: new Date("2024-01-21"),
};

// Helper to create a week of dates
export const createWeekDates = (startDate: Date): Date[] => {
  const dates = [];
  const start = new Date(startDate);
  start.setDate(start.getDate() - start.getDay()); // Go to Sunday

  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    dates.push(date);
  }
  return dates;
};

// Helper to format date as YYYY-MM-DD
export const formatDateKey = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Mock context provider props
export const createMockMealPlannerContext = (overrides = {}) => ({
  state: createMockMealPlannerState(),
  getWeekDates: vi.fn().mockImplementation(createWeekDates),
  getDateKey: vi.fn().mockImplementation(formatDateKey),
  setCurrentWeek: vi.fn(),
  addMealToDay: vi.fn(),
  removeMealFromDay: vi.fn(),
  clearWeek: vi.fn(),
  updateMealPlan: vi.fn(),
  ...overrides,
});

// Custom render function with context
export const renderWithMealPlannerContext = (
  component: React.ReactElement,
  contextProps = {}
) => {
  const mockContext = createMockMealPlannerContext(contextProps);

  // This would typically wrap with actual context provider
  // For now, we'll rely on mocking the hook directly
  return {
    ...render(component),
    mockContext,
  };
};

// Test assertions helpers
export const expectMealToBeDisplayed = (mealName: string) => {
  expect(screen.getByText(mealName)).toBeInTheDocument();
};

export const expectMealDetails = (meal: Meal) => {
  expect(screen.getByText(meal.name)).toBeInTheDocument();
  expect(screen.getByText(`${meal.cookTime}min`)).toBeInTheDocument();
  expect(screen.getByText(meal.servings.toString())).toBeInTheDocument();

  if (meal.calories) {
    expect(screen.getByText(`${meal.calories} cal`)).toBeInTheDocument();
  }
};

export const expectEmptyMealType = (mealType: "breakfast" | "lunch" | "dinner") => {
  expect(screen.getByText(`Add ${mealType}`)).toBeInTheDocument();
};

// Performance testing helpers
export const measureRenderTime = (renderFn: () => void): number => {
  const startTime = performance.now();
  renderFn();
  const endTime = performance.now();
  return endTime - startTime;
};

// Accessibility testing helpers
export const expectAccessibleButton = (button: HTMLElement) => {
  expect(button).toHaveAttribute("type", "button");
  expect(button).not.toHaveAttribute("disabled");
  expect(button).toBeVisible();
};

export const expectAccessibleHeading = (heading: HTMLElement, level: number) => {
  expect(heading.tagName).toBe(`H${level}`);
  expect(heading).toBeVisible();
  expect(heading).toHaveTextContent(/.+/); // Should have content
};

// Event simulation helpers
export const simulateHover = (element: HTMLElement) => {
  fireEvent.mouseEnter(element);
};

export const simulateLeave = (element: HTMLElement) => {
  fireEvent.mouseLeave(element);
};

export const simulateClick = (element: HTMLElement) => {
  fireEvent.click(element);
};

// Mock implementations for commonly used functions
export const mockImplementations = {
  getWeekDates: (date: Date) => createWeekDates(date),
  getDateKey: (date: Date) => formatDateKey(date),
  setCurrentWeek: vi.fn(),
  addMealToDay: vi.fn(),
  removeMealFromDay: vi.fn(),
  clearWeek: vi.fn(),
};

// Snapshot testing helpers
export const expectComponentSnapshot = (container: HTMLElement) => {
  expect(container.firstChild).toMatchSnapshot();
};

// Import required testing utilities (these would be imported at the top normally)
// import { render, screen, fireEvent } from "@testing-library/react";
// import { vi } from "vitest";
declare const vi: any;
declare const render: any;
declare const screen: any;
declare const fireEvent: any;
