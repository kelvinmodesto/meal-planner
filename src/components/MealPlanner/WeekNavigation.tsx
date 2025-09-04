import styled from "@emotion/styled";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Copy,
} from "lucide-react";
import { useMealPlanner } from "@/contexts/MealPlannerContext";

const WeekNavigationSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
`;

const WeekInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const WeekTitle = styled.h2`
  margin: 0;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const WeekDateRange = styled.div`
  font-size: 1rem;
  opacity: 0.8;
  font-weight: 500;
`;

const NavigationControls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
  }
`;

const NavButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 8px;
  padding: 0.75rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 0.8rem;
    font-size: 0.8rem;
  }
`;

interface WeekNavigationProps {
  currentWeek: Date;
}

export function WeekNavigation({ currentWeek }: WeekNavigationProps) {
  const { setCurrentWeek, clearWeek, getWeekDates } = useMealPlanner();

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + (direction === "next" ? 7 : -7));
    setCurrentWeek(newDate);
  };

  const goToCurrentWeek = () => {
    setCurrentWeek(new Date());
  };

  const formatWeekRange = () => {
    const weekDates = getWeekDates(currentWeek);
    const start = weekDates[0];
    const end = weekDates[6];

    const startMonth = start.toLocaleDateString("en-US", { month: "short" });
    const endMonth = end.toLocaleDateString("en-US", { month: "short" });
    const startDay = start.getDate();
    const endDay = end.getDate();
    const year = end.getFullYear();

    if (startMonth === endMonth) {
      return `${startMonth} ${startDay} - ${endDay}, ${year}`;
    } else {
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
    }
  };

  const isCurrentWeek = () => {
    const today = new Date();
    const weekDates = getWeekDates(currentWeek);
    return weekDates.some(
      (date) => date.toDateString() === today.toDateString(),
    );
  };

  return (
    <WeekNavigationSection>
      <WeekInfo>
        <WeekTitle>
          <Calendar size={20} />
          Week Overview
        </WeekTitle>
        <WeekDateRange>{formatWeekRange()}</WeekDateRange>
      </WeekInfo>

      <NavigationControls>
        <NavButton onClick={() => navigateWeek("prev")} title="Previous week">
          <ChevronLeft size={20} />
        </NavButton>

        <NavButton onClick={() => navigateWeek("next")} title="Next week">
          <ChevronRight size={20} />
        </NavButton>

        {!isCurrentWeek() && (
          <ActionButton onClick={goToCurrentWeek} title="Go to current week">
            <Calendar size={16} />
            Today
          </ActionButton>
        )}

        <ActionButton onClick={clearWeek} title="Clear this week's meal plan">
          <RotateCcw size={16} />
          Clear Week
        </ActionButton>
      </NavigationControls>
    </WeekNavigationSection>
  );
}
