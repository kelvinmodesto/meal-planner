import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MealPlannerHeader } from "../MealPlannerHeader";

describe("MealPlannerHeader", () => {
  it("renders the main title correctly", () => {
    render(<MealPlannerHeader />);

    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Weekly Meal Planner");
  });

  it("renders the subtitle with correct content", () => {
    render(<MealPlannerHeader />);

    const subtitle = screen.getByText(
      /Plan your meals for the entire week and stay organized with smart scheduling/i,
    );
    expect(subtitle).toBeInTheDocument();
  });

  it("has proper semantic structure", () => {
    render(<MealPlannerHeader />);

    const header = screen.getByRole("heading", { level: 1 });
    expect(header.tagName).toBe("H1");

    const subtitle = screen.getByText(/Plan your meals for the entire week/i);
    expect(subtitle.tagName).toBe("P");
  });

  it("applies correct CSS classes", () => {
    render(<MealPlannerHeader />);

    const title = screen.getByRole("heading", { level: 1 });
    // Check that the element exists and has styling applied via emotion
    expect(title).toBeInTheDocument();
    expect(title.className).toBeTruthy(); // Should have emotion-generated classes
  });

  it("has accessible text content", () => {
    render(<MealPlannerHeader />);

    // Check that text content is accessible and not empty
    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toHaveAccessibleName("Weekly Meal Planner");

    const subtitle = screen.getByText(/Plan your meals/i);
    expect(subtitle).toBeVisible();
  });

  it("renders without errors", () => {
    expect(() => render(<MealPlannerHeader />)).not.toThrow();
  });

  it("matches snapshot", () => {
    const { container } = render(<MealPlannerHeader />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
