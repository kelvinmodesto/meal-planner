import styled from "@emotion/styled";
import type { Activity } from "@/contexts/DashboardContext";

const RecentActivitySection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const SectionTitle = styled.h2`
  color: white;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 1.2rem;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const ActivityTime = styled.div`
  opacity: 0.7;
  font-size: 0.9rem;
`;

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <RecentActivitySection>
      <SectionTitle>Recent Activity</SectionTitle>
      <ActivityList>
        {activities.map((activity) => (
          <ActivityItem key={activity.id}>
            <ActivityIcon>{activity.icon}</ActivityIcon>
            <ActivityContent>
              <ActivityTitle>{activity.title}</ActivityTitle>
              <ActivityTime>{activity.time}</ActivityTime>
            </ActivityContent>
          </ActivityItem>
        ))}
      </ActivityList>
    </RecentActivitySection>
  );
}
