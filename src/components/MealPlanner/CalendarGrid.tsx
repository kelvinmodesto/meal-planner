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

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const CalendarGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DayColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 400px;
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
`;

const DayName = styled.div`
  margin-bottom: 0.25rem;
`;

const DayDate = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const MealSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  flex: 1;
  display: flex;
  flex-direction: column;
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
`;

const MealName = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const MealDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 0.8;
  font-size: 0.8rem;
`;

const MealInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MealActions = styled.div`
  display: flex;
  gap: 0.25rem;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${MealItem}:hover & {
    opacity: 1;
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
  min-height: 80px;
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 1rem;
`;

const CaloriesBadge = styled.div`
  background: rgba(34, 197, 94, 0.8);
  color: white;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-weight: 500;
`;

interface CalendarGridProps {
  currentWeek: Date;
  weekPlan: WeekPlan;
}

export function CalendarGrid({ currentWeek, weekPlan }: CalendarGridProps) {
  const {
    getWeekDates,
    getDateKey,
    addMealToDay,
    removeMealFromDay,
    getAvailableMealsByType,
  } = useMealPlanner();

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
