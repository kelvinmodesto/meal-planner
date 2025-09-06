import { useMealPlanner } from "@/contexts/MealPlannerContext";
import { MealPlannerHeader } from "./MealPlannerHeader";
import { WeekNavigation } from "./WeekNavigation";
import { CalendarGrid } from "./CalendarGrid";
import { MealPlannerStats } from "./MealPlannerStats";
import styled from "@emotion/styled";

const PlannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 1024px) {
    gap: 1.75rem;
  }

  @media (max-width: 768px) {
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1.25rem;
  }
`;

const MainContent = styled.div`
  display: flex;
  gap: 2rem;
  align-items: start;

  @media (max-width: 768px) {
    width: 746px;
  }

  @media (max-width: 480px) {
    width: 349px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 0;

  @media (max-width: 1024px) {
    gap: 1.25rem;
  }

  @media (max-width: 768px) {
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

export function MealPlanner() {
  const { state } = useMealPlanner();

  if (state.isLoading) {
    return (
      <PlannerContainer>
        <MealPlannerHeader />
        <div style={{ color: "white", textAlign: "center", padding: "2rem" }}>
          Loading meal planner...
        </div>
      </PlannerContainer>
    );
  }

  return (
    <PlannerContainer>
      <MealPlannerHeader />

      <MealPlannerStats stats={state.stats} />

      <MainContent>
        <LeftSection>
          <WeekNavigation currentWeek={state.currentWeek} />
          <CalendarGrid
            currentWeek={state.currentWeek}
            weekPlan={state.weekPlan}
          />
        </LeftSection>
      </MainContent>
    </PlannerContainer>
  );
}
