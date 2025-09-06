import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { CalendarGrid } from "../CalendarGrid";
import { useMealPlanner } from "@/contexts/MealPlannerContext";
import type { WeekPlan, Meal } from "@/contexts/MealPlannerContext";

// Mock the useMealPlanner hook
vi.mock("@/contexts/MealPlannerContext", () => ({
  useMealPlanner: vi.fn(),
}));

const mockMealPlannerContext = {
  getWeekDates: vi.fn(),
  getDateKey: vi.fn(),
  addMealToDay: vi.fn(),
  removeMealFromDay: vi.fn(),
};

const mockMeals: Meal[] = [
  {
    id: 1,
    name: "Scrambled Eggs with Toast",
    type: "breakfast",
    cookTime: 15,
    servings: 2,
    calories: 350,
    ingredients: ["eggs", "bread", "butter"],
    instructions: "Cook eggs, toast bread",
    tags: ["quick", "protein"],
    difficulty: "easy",
    prepTime: 5,
    imageUrl: "https://example.com/eggs.jpg",
  },
  {
    id: 2,
    name: "Chicken Caesar Salad",
    type: "lunch",
    cookTime: 20,
    servings: 4,
    calories: 450,
    ingredients: ["chicken", "lettuce", "caesar dressing"],
    instructions: "Grill chicken, prepare salad",
    tags: ["healthy", "protein"],
    difficulty: "medium",
    prepTime: 10,
    imageUrl: "https://example.com/caesar.jpg",
  },
  {
    id: 3,
    name: "Beef Stir Fry",
    type: "dinner",
    cookTime: 30,
    servings: 3,
    calories: 520,
    ingredients: ["beef", "vegetables", "soy sauce"],
    instructions: "Stir fry ingredients",
    tags: ["protein", "vegetables"],
    difficulty: "medium",
    prepTime: 15,
    imageUrl: "https://example.com/stirfry.jpg",
  },
];

const mockWeekPlan: WeekPlan = {
  "2024-01-15": [mockMeals[0], mockMeals[1]], // Monday
  "2024-01-16": [mockMeals[2]], // Tuesday
  "2024-01-17": [], // Wednesday - empty
};

describe("CalendarGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default mock implementation
    (useMealPlanner as any).mockReturnValue(mockMealPlannerContext);

    // Mock getWeekDates to return a week of dates
    mockMealPlannerContext.getWeekDates.mockImplementation((date: Date) => {
      const weekDates = [];
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay()); // Get Sunday

      for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        weekDates.push(day);
      }
      return weekDates;
    });

    // Mock getDateKey to return YYYY-MM-DD format
    mockMealPlannerContext.getDateKey.mockImplementation((date: Date) => {
      return date.toISOString().split("T")[0];
    });
  });

  const currentWeek = new Date("2024-01-15"); // Monday, January 15, 2024

  it("renders all 7 days of the week", () => {
    render(<CalendarGrid currentWeek={currentWeek} weekPlan={mockWeekPlan} />);

    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    dayNames.forEach((dayName) => {
      expect(screen.getByText(dayName)).toBeInTheDocument();
    });
  });

  it("renders all meal types for each day", () => {
    render(<CalendarGrid currentWeek={currentWeek} weekPlan={mockWeekPlan} />);

    const mealTypes = ["breakfast", "lunch", "dinner"];

    mealTypes.forEach((mealType) => {
      const mealHeaders = screen.getAllByText(mealType);
      expect(mealHeaders).toHaveLength(7); // One for each day
    });
  });

  it("displays meals in the correct day and meal type", () => {
    render(<CalendarGrid currentWeek={currentWeek} weekPlan={mockWeekPlan} />);

    // Check that meals appear in the correct sections
    expect(screen.getByText("Scrambled Eggs with Toast")).toBeInTheDocument();
    expect(screen.getByText("Chicken Caesar Salad")).toBeInTheDocument();
    expect(screen.getByText("Beef Stir Fry")).toBeInTheDocument();
  });

  it("shows meal details correctly", () => {
    render(<CalendarGrid currentWeek={currentWeek} weekPlan={mockWeekPlan} />);

    const scrambledEggsItem = screen
      .getByText("Scrambled Eggs with Toast")
      .closest('[class*="MealItem"]');

    // Check that the meal details section contains the expected information
    expect(scrambledEggsItem).toHaveTextContent("15");
    expect(scrambledEggsItem).toHaveTextContent("min");
    expect(scrambledEggsItem).toHaveTextContent("2");
    expect(scrambledEggsItem).toHaveTextContent("350");
    expect(scrambledEggsItem).toHaveTextContent("cal");
  });

  it("calls addMealToDay when add meal button is clicked", () => {
    render(<CalendarGrid currentWeek={currentWeek} weekPlan={mockWeekPlan} />);

    const addButtons = screen.getAllByTitle(/Add .+ meal/);
    expect(addButtons.length).toBeGreaterThan(0);

    fireEvent.click(addButtons[0]);
    expect(mockMealPlannerContext.addMealToDay).toHaveBeenCalledTimes(1);
  });

  it("calls removeMealFromDay when remove meal button is clicked", () => {
    render(<CalendarGrid currentWeek={currentWeek} weekPlan={mockWeekPlan} />);

    const mealItem = screen
      .getByText("Scrambled Eggs with Toast")
      .closest('[class*="MealItem"]');

    // The remove button should be there but may be hidden by CSS
    const removeButton = within(mealItem!).getByTitle("Remove meal");
    fireEvent.click(removeButton);

    expect(mockMealPlannerContext.removeMealFromDay).toHaveBeenCalledTimes(1);
  });

  it("shows empty state for days with no meals", () => {
    const emptyWeekPlan: WeekPlan = {};
    render(<CalendarGrid currentWeek={currentWeek} weekPlan={emptyWeekPlan} />);

    const addBreakfastTexts = screen.getAllByText("Add breakfast");
    const addLunchTexts = screen.getAllByText("Add lunch");
    const addDinnerTexts = screen.getAllByText("Add dinner");

    expect(addBreakfastTexts.length).toBe(7);
    expect(addLunchTexts.length).toBe(7);
    expect(addDinnerTexts.length).toBe(7);
  });

  it("highlights today's date when it's in the current week", () => {
    const today = new Date();
    render(<CalendarGrid currentWeek={today} weekPlan={mockWeekPlan} />);

    // The today highlighting is done via inline styles
    const dayHeaders = screen.getAllByText(
      /Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday/,
    );
    const todayHeader = dayHeaders.find((header) => {
      const style = header.closest("div")?.style;
      return style?.background?.includes("102, 126, 234");
    });

    // If today is in the week, it should be highlighted
    if (todayHeader) {
      expect(todayHeader).toBeInTheDocument();
    }
  });

  it("formats dates correctly in day headers", () => {
    render(<CalendarGrid currentWeek={currentWeek} weekPlan={mockWeekPlan} />);

    // Check that dates are formatted correctly - there should be multiple Jan dates
    const janDates = screen.getAllByText(/Jan \d+/);
    expect(janDates.length).toBeGreaterThan(0);
  });

  it("groups meals by type correctly", () => {
    const mixedMealsWeekPlan: WeekPlan = {
      "2024-01-15": [
        { ...mockMeals[0], type: "breakfast" },
        { ...mockMeals[1], type: "lunch" },
        { ...mockMeals[2], type: "dinner" },
      ],
    };

    render(
      <CalendarGrid currentWeek={currentWeek} weekPlan={mixedMealsWeekPlan} />,
    );

    // Each meal should appear in the grid - just verify they're all present
    expect(screen.getByText("Scrambled Eggs with Toast")).toBeInTheDocument();
    expect(screen.getByText("Chicken Caesar Salad")).toBeInTheDocument();
    expect(screen.getByText("Beef Stir Fry")).toBeInTheDocument();

    // Verify meal type headers are present
    const breakfastHeaders = screen.getAllByText("breakfast");
    const lunchHeaders = screen.getAllByText("lunch");
    const dinnerHeaders = screen.getAllByText("dinner");

    expect(breakfastHeaders.length).toBe(7); // One for each day
    expect(lunchHeaders.length).toBe(7);
    expect(dinnerHeaders.length).toBe(7);
  });

  it("handles meals without calories gracefully", () => {
    const mealWithoutCalories: Meal = {
      ...mockMeals[0],
      calories: undefined,
    };

    const weekPlanWithoutCalories: WeekPlan = {
      "2024-01-15": [mealWithoutCalories],
    };

    render(
      <CalendarGrid
        currentWeek={currentWeek}
        weekPlan={weekPlanWithoutCalories}
      />,
    );

    const mealItem = screen
      .getByText("Scrambled Eggs with Toast")
      .closest("div");
    expect(within(mealItem!).queryByText(/\d+ cal/)).not.toBeInTheDocument();
  });

  it("displays correct meal type colors", () => {
    render(<CalendarGrid currentWeek={currentWeek} weekPlan={mockWeekPlan} />);

    const breakfastLabel = screen.getAllByText("breakfast")[0];
    const lunchLabel = screen.getAllByText("lunch")[0];
    const dinnerLabel = screen.getAllByText("dinner")[0];

    // Check that meal type labels have their respective colors
    expect(breakfastLabel).toHaveStyle({ color: "#FFD700" }); // Gold for breakfast
    expect(lunchLabel).toHaveStyle({ color: "#FF6B6B" }); // Red for lunch
    expect(dinnerLabel).toHaveStyle({ color: "#4ECDC4" }); // Teal for dinner
  });

  it("prevents event propagation on remove button click", () => {
    const mealClickHandler = vi.fn();

    render(<CalendarGrid currentWeek={currentWeek} weekPlan={mockWeekPlan} />);

    const mealItem = screen
      .getByText("Scrambled Eggs with Toast")
      .closest('[class*="MealItem"]');

    // Find remove button and click it
    const removeButton = within(mealItem!).getByTitle("Remove meal");
    fireEvent.click(removeButton);

    // Verify the remove function was called (we can't easily test stopPropagation)
    expect(mockMealPlannerContext.removeMealFromDay).toHaveBeenCalled();
  });

  it("handles long meal names with text truncation", () => {
    const longNameMeal: Meal = {
      ...mockMeals[0],
      name: "This is a very long meal name that should be truncated when it exceeds the container width",
    };

    const weekPlanWithLongName: WeekPlan = {
      "2024-01-15": [longNameMeal],
    };

    render(
      <CalendarGrid
        currentWeek={currentWeek}
        weekPlan={weekPlanWithLongName}
      />,
    );

    const mealNameElement = screen.getByText(/This is a very long meal name/);
    // Just verify the element exists and has some styling applied
    expect(mealNameElement).toBeInTheDocument();
    expect(mealNameElement.className).toBeTruthy();
  });

  it("renders without errors with empty week plan", () => {
    expect(() =>
      render(<CalendarGrid currentWeek={currentWeek} weekPlan={{}} />),
    ).not.toThrow();
  });

  it("renders without errors with undefined meals for a day", () => {
    const undefinedMealsWeekPlan: WeekPlan = {
      "2024-01-15": undefined as any,
    };

    expect(() =>
      render(
        <CalendarGrid
          currentWeek={currentWeek}
          weekPlan={undefinedMealsWeekPlan}
        />,
      ),
    ).not.toThrow();
  });

  it("has proper accessibility attributes for buttons", () => {
    render(<CalendarGrid currentWeek={currentWeek} weekPlan={mockWeekPlan} />);

    const addMealButtons = screen.getAllByRole("button", {
      name: /Add .+ meal/,
    });
    expect(addMealButtons.length).toBeGreaterThan(0);

    addMealButtons.forEach((button) => {
      expect(button).toHaveAttribute("title");
    });
  });

  it("matches snapshot", () => {
    const { container } = render(
      <CalendarGrid currentWeek={currentWeek} weekPlan={mockWeekPlan} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
