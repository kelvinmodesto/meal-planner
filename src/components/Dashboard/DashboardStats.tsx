import styled from "@emotion/styled";
import { ChefHat, Calendar, ShoppingCart, Clock } from "lucide-react";
import type { DashboardStats as StatsType } from "@/contexts/DashboardContext";

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition:
    transform 0.3s ease,
    background 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.2);
  }
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  opacity: 0.9;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StatDescription = styled.p`
  margin: 0;
  opacity: 0.8;
  font-size: 0.9rem;
`;

interface DashboardStatsProps {
  stats: StatsType;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statsData = [
    {
      title: "Total Recipes",
      value: stats.totalRecipes.toString(),
      description: "Saved in your collection",
      icon: <ChefHat size={24} />,
    },
    {
      title: "This Week's Meals",
      value: stats.weeklyMeals.toString(),
      description: "Planned for 7 days",
      icon: <Calendar size={24} />,
    },
    {
      title: "Shopping Items",
      value: stats.shoppingItems.toString(),
      description: "Items in current list",
      icon: <ShoppingCart size={24} />,
    },
    {
      title: "Avg Cook Time",
      value: `${stats.averageCookTime}min`,
      description: "For your favorite recipes",
      icon: <Clock size={24} />,
    },
  ];

  return (
    <StatsGrid>
      {statsData.map((stat, index) => (
        <StatCard key={index}>
          <StatHeader>
            <StatIcon>{stat.icon}</StatIcon>
            <StatTitle>{stat.title}</StatTitle>
          </StatHeader>
          <StatValue>{stat.value}</StatValue>
          <StatDescription>{stat.description}</StatDescription>
        </StatCard>
      ))}
    </StatsGrid>
  );
}
