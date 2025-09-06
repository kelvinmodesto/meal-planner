import styled from "@emotion/styled";
import { Plus, Clock, Users, X } from "lucide-react";
import {
  useMealPlanner,
  type WeekPlan,
  type Meal,
} from "@/contexts/MealPlannerContext";

const CalendarContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 1.5rem;
    width: 746px;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    border-radius: 8px;
    width: 349px;
  }
`;

const CalendarGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 1rem;
  overflow: hidden;
  width: 100%;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.75rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 0.75rem;
  }
`;

const DayColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 400px;
  max-height: 600px;
  overflow: hidden;
  min-width: 0;

  @media (max-width: 1024px) {
    min-height: 350px;
    max-height: 500px;
  }

  @media (max-width: 768px) {
    min-height: 300px;
    max-height: 450px;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    min-height: auto;
    max-height: none;
    gap: 0.5rem;
  }
`;

const DayHeader = styled.div`
  text-align: center;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  min-width: 0;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.625rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.5rem;
  }
`;

const DayName = styled.div`
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DayDate = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MealSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 0.75rem;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    padding: 0.625rem;
  }
`;

const MealTypeHeader = styled.div`
  font-weight: 600;
  color: white;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 0;
  gap: 0.5rem;
`;

const MealType = styled.span<{ mealType: string }>`
  color: ${(props) => {
    switch (props.mealType) {
      case "breakfast":
        return "#FFD700";
      case "lunch":
        return "#FF6B6B";
      case "dinner":
        return "#4ECDC4";
      default:
        return "white";
    }
  }};
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const AddMealButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 6px;
  padding: 0.4rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  min-width: 28px;
  min-height: 28px;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const MealsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  max-height: 200px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

const MealItem = styled.div`
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 0.75rem;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 0.625rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const MealName = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  line-height: 1.3;
  max-width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MealDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 0.8;
  font-size: 0.8rem;
  min-width: 0;
  flex-shrink: 0;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const MealInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
  flex: 1;
  overflow: hidden;

  @media (max-width: 480px) {
    flex-wrap: wrap;
    gap: 0.375rem;
  }
`;

const MealActions = styled.div`
  display: flex;
  gap: 0.25rem;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${MealItem}:hover & {
    opacity: 1;
  }

  @media (max-width: 480px) {
    opacity: 0.7;
  }
`;

const ActionButton = styled.button`
  background: rgba(255, 0, 0, 0.2);
  border: none;
  border-radius: 4px;
  padding: 0.25rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 0, 0, 0.4);
    transform: scale(1.1);
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  text-align: center;
  flex: 1;
  gap: 0.5rem;
  min-height: 60px;
  max-height: 100px;
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.75rem;

  @media (max-width: 768px) {
    min-height: 50px;
    max-height: 80px;
    padding: 0.5rem;
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    min-height: 40px;
    max-height: 60px;
    padding: 0.375rem;
    gap: 0.25rem;
  }
`;

const CaloriesBadge = styled.div`
  background: rgba(34, 197, 94, 0.8);
  color: white;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
`;

interface CalendarGridProps {
  currentWeek: Date;
  weekPlan: WeekPlan;
}

export function CalendarGrid({ currentWeek, weekPlan }: CalendarGridProps) {
  const { getWeekDates, getDateKey, addMealToDay, removeMealFromDay } =
    useMealPlanner();

  const getMealsForDay = (dateKey: string) => {
    return weekPlan[dateKey] || [];
  };

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const weekDates = getWeekDates(currentWeek);

  const handleAddMeal = (
    dateKey: string,
    mealType: "breakfast" | "lunch" | "dinner",
  ) => {
    addMealToDay(dateKey, mealType);
  };

  const handleRemoveMeal = (
    dateKey: string,
    mealType: "breakfast" | "lunch" | "dinner",
    mealId: string,
  ) => {
    removeMealFromDay(dateKey, mealType, mealId);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <CalendarContainer>
      <CalendarGridContainer>
        {weekDates.map((date, index) => {
          const dateKey = getDateKey(date);
          const dayMeals = getMealsForDay(dateKey);

          // Group meals by type
          const mealsGrouped = {
            breakfast: dayMeals.filter((meal) => meal.type === "breakfast"),
            lunch: dayMeals.filter((meal) => meal.type === "lunch"),
            dinner: dayMeals.filter((meal) => meal.type === "dinner"),
          };

          return (
            <DayColumn key={dateKey}>
              <DayHeader
                style={{
                  background: isToday(date)
                    ? "rgba(102, 126, 234, 0.3)"
                    : "rgba(255, 255, 255, 0.15)",
                }}
              >
                <DayName>{dayNames[index]}</DayName>
                <DayDate>
                  {date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </DayDate>
              </DayHeader>

              {(["breakfast", "lunch", "dinner"] as const).map((mealType) => (
                <MealSection key={mealType}>
                  <MealTypeHeader>
                    <MealType mealType={mealType}>{mealType}</MealType>
                    <AddMealButton
                      onClick={() => handleAddMeal(dateKey, mealType)}
                      title={`Add ${mealType} meal`}
                    >
                      <Plus size={14} />
                    </AddMealButton>
                  </MealTypeHeader>

                  <MealsList>
                    {mealsGrouped[mealType].length > 0 ? (
                      mealsGrouped[mealType].map((meal: Meal) => (
                        <MealItem key={meal.id}>
                          <MealName>{meal.name}</MealName>
                          <MealDetails>
                            <MealInfo>
                              <Clock size={12} />
                              {meal.cookTime}min
                              <Users size={12} />
                              {meal.servings}
                              {meal.calories && (
                                <CaloriesBadge>
                                  {meal.calories} cal
                                </CaloriesBadge>
                              )}
                            </MealInfo>
                            <MealActions>
                              <ActionButton
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveMeal(
                                    dateKey,
                                    mealType,
                                    meal.id.toString(),
                                  );
                                }}
                                title="Remove meal"
                              >
                                <X size={10} />
                              </ActionButton>
                            </MealActions>
                          </MealDetails>
                        </MealItem>
                      ))
                    ) : (
                      <EmptyState>
                        <Plus size={16} />
                        <div>Add {mealType}</div>
                      </EmptyState>
                    )}
                  </MealsList>
                </MealSection>
              ))}
            </DayColumn>
          );
        })}
      </CalendarGridContainer>
    </CalendarContainer>
  );
}
