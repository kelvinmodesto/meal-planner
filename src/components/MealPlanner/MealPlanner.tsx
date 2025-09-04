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
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
