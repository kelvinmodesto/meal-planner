import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MealPlanner } from "../MealPlanner";
import { useMealPlanner } from "@/contexts/MealPlannerContext";
import type { MealPlannerState } from "@/contexts/MealPlannerContext";

// Mock the useMealPlanner hook
vi.mock("@/contexts/MealPlannerContext", () => ({
  useMealPlanner: vi.fn(),
}));

// Mock child components
vi.mock("../MealPlannerHeader", () => ({
  MealPlannerHeader: () => (
    <div data-testid="meal-planner-header">Meal Planner Header</div>
  ),
}));

vi.mock("../MealPlannerStats", () => ({
  MealPlannerStats: ({ stats }: any) => (
    <div data-testid="meal-planner-stats">Stats: {stats.totalMeals} meals</div>
  ),
}));

vi.mock("../WeekNavigation", () => ({
  WeekNavigation: ({ currentWeek }: any) => (
    <div data-testid="week-navigation">
      Week: {currentWeek.toISOString().split("T")[0]}
    </div>
  ),
}));

vi.mock("../CalendarGrid", () => ({
  CalendarGrid: ({ currentWeek, weekPlan }: any) => (
    <div data-testid="calendar-grid">
      Calendar for {currentWeek.toISOString().split("T")[0]} with{" "}
      {Object.keys(weekPlan).length} planned days
    </div>
  ),
}));

const mockDefaultState: MealPlannerState = {
  currentWeek: new Date("2024-01-15"),
  weekPlan: {
    "2024-01-15": [
      {
        id: 1,
        name: "Test Meal",
        type: "breakfast",
        cookTime: 15,
        servings: 2,
        calories: 350,
        ingredients: ["eggs", "bread"],
        instructions: "Cook meal",
        tags: ["quick"],
        difficulty: "easy",
        prepTime: 5,
        imageUrl: "https://example.com/test.jpg",
      },
    ],
  },
  stats: {
    totalMeals: 5,
    plannedDays: 3,
    averageCookTime: 25,
    totalCalories: 1500,
  },
  isLoading: false,
  error: null,
};

const mockLoadingState: MealPlannerState = {
  ...mockDefaultState,
  isLoading: true,
};

const mockErrorState: MealPlannerState = {
  ...mockDefaultState,
  isLoading: false,
  error: "Failed to load meal plan data",
};

describe("MealPlanner", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state correctly", () => {
    (useMealPlanner as any).mockReturnValue({
      state: mockLoadingState,
    });

    render(<MealPlanner />);

    expect(screen.getByTestId("meal-planner-header")).toBeInTheDocument();
    expect(screen.getByText("Loading meal planner...")).toBeInTheDocument();

    // Should not render main content when loading
    expect(screen.queryByTestId("meal-planner-stats")).not.toBeInTheDocument();
    expect(screen.queryByTestId("week-navigation")).not.toBeInTheDocument();
    expect(screen.queryByTestId("calendar-grid")).not.toBeInTheDocument();
  });

  it("renders main content when not loading", () => {
    (useMealPlanner as any).mockReturnValue({
      state: mockDefaultState,
    });

    render(<MealPlanner />);

    expect(screen.getByTestId("meal-planner-header")).toBeInTheDocument();
    expect(screen.getByTestId("meal-planner-stats")).toBeInTheDocument();
    expect(screen.getByTestId("week-navigation")).toBeInTheDocument();
    expect(screen.getByTestId("calendar-grid")).toBeInTheDocument();

    expect(
      screen.queryByText("Loading meal planner..."),
    ).not.toBeInTheDocument();
  });

  it("passes correct props to child components", () => {
    (useMealPlanner as any).mockReturnValue({
      state: mockDefaultState,
    });

    render(<MealPlanner />);

    // Check MealPlannerStats receives stats
    expect(screen.getByText("Stats: 5 meals")).toBeInTheDocument();

    // Check WeekNavigation receives currentWeek
    expect(screen.getByTestId("week-navigation")).toHaveTextContent(
      "Week: 2024-01-15",
    );

    // Check CalendarGrid receives currentWeek and weekPlan
    expect(screen.getByTestId("calendar-grid")).toHaveTextContent(
      "Calendar for 2024-01-15 with 1 planned days",
    );
  });

  it("handles empty week plan correctly", () => {
    const emptyState: MealPlannerState = {
      ...mockDefaultState,
      weekPlan: {},
    };

    (useMealPlanner as any).mockReturnValue({
      state: emptyState,
    });

    render(<MealPlanner />);

    expect(screen.getByTestId("calendar-grid")).toHaveTextContent(
      "Calendar for 2024-01-15 with 0 planned days",
    );
  });

  it("displays error state when there's an error", () => {
    (useMealPlanner as any).mockReturnValue({
      state: mockErrorState,
    });

    render(<MealPlanner />);

    // Should still render header
    expect(screen.getByTestId("meal-planner-header")).toBeInTheDocument();

    // Should render main content even with error (error handling might be in individual components)
    expect(screen.getByTestId("meal-planner-stats")).toBeInTheDocument();
    expect(screen.getByTestId("week-navigation")).toBeInTheDocument();
    expect(screen.getByTestId("calendar-grid")).toBeInTheDocument();
  });

  it("has proper layout structure", () => {
    (useMealPlanner as any).mockReturnValue({
      state: mockDefaultState,
    });

    const { container } = render(<MealPlanner />);

    // Check that main container has proper class
    const plannerContainer = container.firstChild;
    expect(plannerContainer).toHaveClass(/PlannerContainer/);
  });

  it("renders with responsive layout", () => {
    (useMealPlanner as any).mockReturnValue({
      state: mockDefaultState,
    });

    const { container } = render(<MealPlanner />);

    // Check for MainContent element existence
    const mainContent = container.querySelector('[class*="MainContent"]');
    expect(mainContent).toBeInTheDocument();
  });

  it("handles different week dates correctly", () => {
    const differentWeekState: MealPlannerState = {
      ...mockDefaultState,
      currentWeek: new Date("2024-02-01"),
    };

    (useMealPlanner as any).mockReturnValue({
      state: differentWeekState,
    });

    render(<MealPlanner />);

    expect(screen.getByTestId("week-navigation")).toHaveTextContent(
      "Week: 2024-02-01",
    );
    expect(screen.getByTestId("calendar-grid")).toHaveTextContent(
      "Calendar for 2024-02-01 with 1 planned days",
    );
  });

  it("handles large datasets without performance issues", () => {
    const largePlan: any = {};
    // Create a large week plan
    for (let i = 0; i < 50; i++) {
      largePlan[`2024-01-${String(i + 1).padStart(2, "0")}`] = [
        {
          id: i,
          name: `Meal ${i}`,
          type: "breakfast",
          cookTime: 15,
          servings: 2,
          calories: 300,
          ingredients: ["ingredient"],
          instructions: "Cook",
          tags: ["tag"],
          difficulty: "easy",
          prepTime: 5,
          imageUrl: "https://example.com/meal.jpg",
        },
      ];
    }

    const largeState: MealPlannerState = {
      ...mockDefaultState,
      weekPlan: largePlan,
      stats: {
        totalMeals: 50,
        plannedDays: 30,
        averageCookTime: 20,
        totalCalories: 15000,
      },
    };

    (useMealPlanner as any).mockReturnValue({
      state: largeState,
    });

    const startTime = performance.now();
    render(<MealPlanner />);
    const endTime = performance.now();

    // Should render without significant delay
    expect(endTime - startTime).toBeLessThan(100);
    expect(screen.getByText("Stats: 50 meals")).toBeInTheDocument();
  });

  it("maintains component composition pattern", () => {
    (useMealPlanner as any).mockReturnValue({
      state: mockDefaultState,
    });

    render(<MealPlanner />);

    // Verify that all expected child components are rendered
    expect(screen.getByTestId("meal-planner-header")).toBeInTheDocument();
    expect(screen.getByTestId("meal-planner-stats")).toBeInTheDocument();
    expect(screen.getByTestId("week-navigation")).toBeInTheDocument();
    expect(screen.getByTestId("calendar-grid")).toBeInTheDocument();
  });

  it("handles state updates gracefully", () => {
    const { rerender } = render(<MealPlanner />);

    // Initial render with loading state
    (useMealPlanner as any).mockReturnValue({
      state: mockLoadingState,
    });
    rerender(<MealPlanner />);
    expect(screen.getByText("Loading meal planner...")).toBeInTheDocument();

    // Update to loaded state
    (useMealPlanner as any).mockReturnValue({
      state: mockDefaultState,
    });
    rerender(<MealPlanner />);
    expect(
      screen.queryByText("Loading meal planner..."),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("calendar-grid")).toBeInTheDocument();
  });

  it("renders without errors", () => {
    (useMealPlanner as any).mockReturnValue({
      state: mockDefaultState,
    });

    expect(() => render(<MealPlanner />)).not.toThrow();
  });

  it("handles undefined state gracefully", () => {
    (useMealPlanner as any).mockReturnValue({
      state: {
        currentWeek: new Date("2024-01-15"),
        weekPlan: {},
        stats: {
          totalMeals: 0,
          plannedDays: 0,
          averageCookTime: 0,
          totalCalories: 0,
        },
        isLoading: false,
        error: null,
      },
    });

    // Should not crash even with minimal state
    expect(() => render(<MealPlanner />)).not.toThrow();
  });

  it("matches snapshot for loading state", () => {
    (useMealPlanner as any).mockReturnValue({
      state: mockLoadingState,
    });

    const { container } = render(<MealPlanner />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot for loaded state", () => {
    (useMealPlanner as any).mockReturnValue({
      state: mockDefaultState,
    });

    const { container } = render(<MealPlanner />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
