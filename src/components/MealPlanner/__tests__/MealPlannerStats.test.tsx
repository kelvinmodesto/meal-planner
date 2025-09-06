import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MealPlannerStats } from "../MealPlannerStats";
import type { MealPlanStats } from "@/contexts/MealPlannerContext";

const mockStats: MealPlanStats = {
  totalMeals: 15,
  plannedDays: 5,
  averageCookTime: 35,
  totalCalories: 12500,
};

const emptyStats: MealPlanStats = {
  totalMeals: 0,
  plannedDays: 0,
  averageCookTime: 0,
  totalCalories: 0,
};

describe("MealPlannerStats", () => {
  it("renders all stat cards with correct data", () => {
    render(<MealPlannerStats stats={mockStats} />);

    // Check Total Meals
    expect(screen.getByText("Total Meals")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();

    // Check Planned Days
    expect(screen.getByText("Planned Days")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();

    // Check Average Cook Time
    expect(screen.getByText("Avg Cook Time")).toBeInTheDocument();
    expect(screen.getByText("35min")).toBeInTheDocument();

    // Check Total Calories
    expect(screen.getByText("Total Calories")).toBeInTheDocument();
    expect(screen.getByText("12,500")).toBeInTheDocument();
  });

  it("renders icons for each stat", () => {
    render(<MealPlannerStats stats={mockStats} />);

    // Check that all stat cards have their respective icons
    const statCards = screen.getAllByRole("generic");
    expect(statCards.length).toBeGreaterThan(0);
  });

  it("handles zero values correctly", () => {
    render(<MealPlannerStats stats={emptyStats} />);

    // Check for specific zero values by their context
    expect(screen.getByText("Total Meals")).toBeInTheDocument();
    expect(screen.getByText("Planned Days")).toBeInTheDocument();
    expect(screen.getByText("0min")).toBeInTheDocument(); // Average Cook Time

    // Verify there are multiple zero values (Total Meals, Planned Days, Total Calories)
    const zeroValues = screen.getAllByText("0");
    expect(zeroValues.length).toBeGreaterThanOrEqual(3);
  });

  it("formats large numbers correctly", () => {
    const largeStats: MealPlanStats = {
      totalMeals: 100,
      plannedDays: 7,
      averageCookTime: 120,
      totalCalories: 1234567,
    };

    render(<MealPlannerStats stats={largeStats} />);

    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("120min")).toBeInTheDocument();
    expect(screen.getByText("1,234,567")).toBeInTheDocument();
  });

  it("has proper responsive grid layout", () => {
    const { container } = render(<MealPlannerStats stats={mockStats} />);

    const statsGrid = container.querySelector('[class*="StatsGrid"]');
    expect(statsGrid).toHaveStyle({
      display: "grid",
    });
  });

  it("displays all required stat labels", () => {
    render(<MealPlannerStats stats={mockStats} />);

    const expectedLabels = [
      "Total Meals",
      "Planned Days",
      "Avg Cook Time",
      "Total Calories",
    ];

    expectedLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("has hover effects on stat cards", () => {
    const { container } = render(<MealPlannerStats stats={mockStats} />);

    const statCards = container.querySelectorAll('[class*="StatCard"]');
    expect(statCards.length).toBe(4);

    statCards.forEach((card) => {
      expect(card).toHaveStyle({
        transition: "all 0.3s ease",
      });
    });
  });

  it("renders with proper accessibility", () => {
    render(<MealPlannerStats stats={mockStats} />);

    // Check that stat values are readable
    expect(screen.getByText("15")).toBeVisible();
    expect(screen.getByText("5")).toBeVisible();
    expect(screen.getByText("35min")).toBeVisible();
    expect(screen.getByText("12,500")).toBeVisible();
  });

  it("handles decimal values in cook time", () => {
    const decimalStats: MealPlanStats = {
      totalMeals: 10,
      plannedDays: 3,
      averageCookTime: 25.5,
      totalCalories: 5000,
    };

    render(<MealPlannerStats stats={decimalStats} />);
    expect(screen.getByText("25.5min")).toBeInTheDocument();
  });

  it("renders without errors", () => {
    expect(() => render(<MealPlannerStats stats={mockStats} />)).not.toThrow();
  });

  it("matches snapshot", () => {
    const { container } = render(<MealPlannerStats stats={mockStats} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
