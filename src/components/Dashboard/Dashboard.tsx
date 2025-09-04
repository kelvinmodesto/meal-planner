import { useDashboard } from "@/contexts/DashboardContext";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardStats } from "./DashboardStats";
import { QuickActions } from "./QuickActions";
import { RecentActivity } from "./RecentActivity";
import styled from "@emotion/styled";

const DashboardContainer = styled.div`
  display: grid;
  gap: 2rem;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export function Dashboard() {
  const { state } = useDashboard();

  if (state.isLoading) {
    return (
      <DashboardContainer>
        <DashboardHeader />
        <div style={{ color: "white", textAlign: "center", padding: "2rem" }}>
          Loading dashboard data...
        </div>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <DashboardHeader />

      <DashboardStats stats={state.stats} />

      <MainContent>
        <LeftSection>
          <QuickActions actions={state.quickActions} />
        </LeftSection>

        <RightSection>
          <RecentActivity activities={state.recentActivities} />
        </RightSection>
      </MainContent>
    </DashboardContainer>
  );
}
