import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { WeekNavigation } from "../WeekNavigation";
import { useMealPlanner } from "@/contexts/MealPlannerContext";

// Mock the useMealPlanner hook
vi.mock("@/contexts/MealPlannerContext", () => ({
  useMealPlanner: vi.fn(),
}));

const mockMealPlannerContext = {
  setCurrentWeek: vi.fn(),
  clearWeek: vi.fn(),
  getWeekDates: vi.fn(),
};

describe("WeekNavigation", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default mock implementation
    (useMealPlanner as any).mockReturnValue(mockMealPlannerContext);

    // Mock getWeekDates to return a week starting from the provided date
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
  });

  const currentWeek = new Date("2024-01-15"); // Monday, January 15, 2024

  it("renders the week title and navigation controls", () => {
    render(<WeekNavigation currentWeek={currentWeek} />);

    expect(screen.getByText("Week Overview")).toBeInTheDocument();
    expect(screen.getByTitle("Previous week")).toBeInTheDocument();
    expect(screen.getByTitle("Next week")).toBeInTheDocument();
    expect(
      screen.getByTitle("Clear this week's meal plan"),
    ).toBeInTheDocument();
  });

  it("displays the correct week date range", () => {
    render(<WeekNavigation currentWeek={currentWeek} />);

    // Should display the week range based on mocked getWeekDates
    expect(screen.getByText(/Jan 14 - 20, 2024/)).toBeInTheDocument();
  });

  it("calls setCurrentWeek when previous week button is clicked", () => {
    render(<WeekNavigation currentWeek={currentWeek} />);

    const prevButton = screen.getByTitle("Previous week");
    fireEvent.click(prevButton);

    expect(mockMealPlannerContext.setCurrentWeek).toHaveBeenCalledWith(
      expect.any(Date),
    );

    // Verify the date is 7 days earlier
    const calledDate = mockMealPlannerContext.setCurrentWeek.mock.calls[0][0];
    expect(calledDate.getTime()).toBe(
      currentWeek.getTime() - 7 * 24 * 60 * 60 * 1000,
    );
  });

  it("calls setCurrentWeek when next week button is clicked", () => {
    render(<WeekNavigation currentWeek={currentWeek} />);

    const nextButton = screen.getByTitle("Next week");
    fireEvent.click(nextButton);

    expect(mockMealPlannerContext.setCurrentWeek).toHaveBeenCalledWith(
      expect.any(Date),
    );

    // Verify the date is 7 days later
    const calledDate = mockMealPlannerContext.setCurrentWeek.mock.calls[0][0];
    expect(calledDate.getTime()).toBe(
      currentWeek.getTime() + 7 * 24 * 60 * 60 * 1000,
    );
  });

  it("calls clearWeek when clear week button is clicked", () => {
    render(<WeekNavigation currentWeek={currentWeek} />);

    const clearButton = screen.getByTitle("Clear this week's meal plan");
    fireEvent.click(clearButton);

    expect(mockMealPlannerContext.clearWeek).toHaveBeenCalledTimes(1);
  });

  it("shows Today button when not viewing current week", () => {
    const pastWeek = new Date("2023-12-01");
    render(<WeekNavigation currentWeek={pastWeek} />);

    const todayButton = screen.getByTitle("Go to current week");
    expect(todayButton).toBeInTheDocument();
    expect(screen.getByText("Today")).toBeInTheDocument();
  });

  it("hides Today button when viewing current week", () => {
    const today = new Date();
    render(<WeekNavigation currentWeek={today} />);

    const todayButton = screen.queryByTitle("Go to current week");
    expect(todayButton).not.toBeInTheDocument();
  });

  it("navigates to current week when Today button is clicked", () => {
    const pastWeek = new Date("2023-12-01");
    render(<WeekNavigation currentWeek={pastWeek} />);

    const todayButton = screen.getByTitle("Go to current week");
    fireEvent.click(todayButton);

    expect(mockMealPlannerContext.setCurrentWeek).toHaveBeenCalledWith(
      expect.any(Date),
    );
  });

  it("formats week range correctly when crossing months", () => {
    // Week that crosses from December to January
    const crossMonthWeek = new Date("2023-12-31");

    // Mock to return a week that crosses months
    mockMealPlannerContext.getWeekDates.mockReturnValueOnce([
      new Date("2023-12-31"),
      new Date("2024-01-01"),
      new Date("2024-01-02"),
      new Date("2024-01-03"),
      new Date("2024-01-04"),
      new Date("2024-01-05"),
      new Date("2024-01-06"),
    ]);

    render(<WeekNavigation currentWeek={crossMonthWeek} />);

    // Check for the presence of both month names and the year
    expect(screen.getByText(/Dec/)).toBeInTheDocument();
    expect(screen.getByText(/Jan/)).toBeInTheDocument();
    expect(screen.getByText(/2024/)).toBeInTheDocument();
  });

  it("formats week range correctly within same month", () => {
    const sameMonthWeek = new Date("2024-01-10");

    mockMealPlannerContext.getWeekDates.mockReturnValueOnce([
      new Date("2024-01-07"),
      new Date("2024-01-08"),
      new Date("2024-01-09"),
      new Date("2024-01-10"),
      new Date("2024-01-11"),
      new Date("2024-01-12"),
      new Date("2024-01-13"),
    ]);

    render(<WeekNavigation currentWeek={sameMonthWeek} />);

    // Check for the actual formatted date range that would be displayed
    expect(screen.getByText(/Jan 6 - 12, 2024/)).toBeInTheDocument();
  });

  it("has proper semantic structure with calendar icon", () => {
    render(<WeekNavigation currentWeek={currentWeek} />);

    const weekTitle = screen.getByText("Week Overview");
    expect(weekTitle.parentElement).toContainHTML("svg"); // Calendar icon
  });

  it("has accessible button labels", () => {
    render(<WeekNavigation currentWeek={currentWeek} />);

    expect(
      screen.getByRole("button", { name: /previous week/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /next week/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /clear week/i }),
    ).toBeInTheDocument();
  });

  it("renders without errors", () => {
    expect(() =>
      render(<WeekNavigation currentWeek={currentWeek} />),
    ).not.toThrow();
  });

  it("handles edge cases with invalid dates gracefully", () => {
    const invalidDate = new Date("invalid");
    // Component should handle gracefully without crashing
    expect(() =>
      render(<WeekNavigation currentWeek={invalidDate} />),
    ).not.toThrow();
  });

  it("matches snapshot", () => {
    const { container } = render(<WeekNavigation currentWeek={currentWeek} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
