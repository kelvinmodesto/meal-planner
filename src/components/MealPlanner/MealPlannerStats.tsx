import styled from "@emotion/styled";
import { Calendar, Clock, Target, TrendingUp } from "lucide-react";
import type { MealPlanStats } from "@/contexts/MealPlannerContext";

const StatsSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.2);
  }
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  opacity: 0.9;
`;

const StatIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #4ade80;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

interface MealPlannerStatsProps {
  stats: MealPlanStats;
}

export function MealPlannerStats({ stats }: MealPlannerStatsProps) {
  const statsData = [
    {
      label: "Total Meals",
      value: stats.totalMeals.toString(),
      icon: <Target size={20} />,
    },
    {
      label: "Planned Days",
      value: stats.plannedDays.toString(),
      icon: <Calendar size={20} />,
    },
    {
      label: "Avg Cook Time",
      value: `${stats.averageCookTime}min`,
      icon: <Clock size={20} />,
    },
    {
      label: "Total Calories",
      value: stats.totalCalories.toLocaleString(),
      icon: <TrendingUp size={20} />,
    },
  ];

  return (
    <StatsSection>
      <StatsGrid>
        {statsData.map((stat, index) => (
          <StatCard key={index}>
            <StatHeader>
              <StatIcon>{stat.icon}</StatIcon>
              {stat.label}
            </StatHeader>
            <StatValue>{stat.value}</StatValue>
          </StatCard>
        ))}
      </StatsGrid>
    </StatsSection>
  );
}
