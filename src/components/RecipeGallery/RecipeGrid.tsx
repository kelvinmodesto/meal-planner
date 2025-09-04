import styled from "@emotion/styled";
import { Clock, Users, Star, Heart, Eye, ChefHat } from "lucide-react";
import type { Recipe } from "@/contexts/RecipeTypes";
import { useRecipe } from "@/contexts/useRecipe";

const RecipeGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RecipeCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
`;

const RecipeImage = styled.div<{ image: string }>`
  height: 200px;
  background:
    linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 1rem;
`;

const RecipeBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const CuisineTag = styled.div`
  background: rgba(102, 126, 234, 0.8);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  backdrop-filter: blur(5px);
`;

const RecipeContent = styled.div`
  padding: 1.5rem;
  color: white;
`;

const RecipeTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.3;
`;

const RecipeDescription = styled.p`
  margin: 0 0 1rem 0;
  opacity: 0.9;
  line-height: 1.4;
  font-size: 0.95rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const RecipeMetrics = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`;

const Metric = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.9rem;
  opacity: 0.9;
`;

const CaloriesMetric = styled(Metric)`
  color: #f87171;
`;

const TimeMetric = styled(Metric)`
  color: #fbbf24;
`;

const ServingsMetric = styled(Metric)`
  color: #4ade80;
`;

const DietaryTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const DietaryTag = styled.span`
  background: rgba(34, 197, 94, 0.2);
  color: #4ade80;
  padding: 0.2rem 0.6rem;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid rgba(34, 197, 94, 0.3);
`;

const RecipeActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 500;
`;

const RatingStars = styled.div`
  display: flex;
  gap: 0.1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button<{
  variant?: "primary" | "secondary";
  isFavorite?: boolean;
}>`
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  background: ${(props) => {
    if (props.isFavorite) return "rgba(239, 68, 68, 0.8)";
    return props.variant === "primary"
      ? "rgba(102, 126, 234, 0.8)"
      : "rgba(255, 255, 255, 0.1)";
  }};
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${(props) => {
      if (props.isFavorite) return "rgba(239, 68, 68, 1)";
      return props.variant === "primary"
        ? "rgba(102, 126, 234, 1)"
        : "rgba(255, 255, 255, 0.2)";
    }};
    transform: scale(1.1);
  }
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  text-align: center;
  padding: 4rem 2rem;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 2px dashed rgba(255, 255, 255, 0.2);
`;

const EmptyIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

interface RecipeGridProps {
  recipes: Recipe[];
  favorites: number[];
}

export function RecipeGrid({ recipes, favorites }: RecipeGridProps) {
  const { setSelectedRecipe, toggleFavorite } = useRecipe();

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleFavoriteClick = (e: React.MouseEvent, recipeId: number) => {
    e.stopPropagation();
    toggleFavorite(recipeId);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={14} fill="currentColor" />);
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          size={14}
          fill="currentColor"
          style={{ opacity: 0.5 }}
        />,
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={14} style={{ opacity: 0.3 }} />,
      );
    }

    return stars;
  };

  if (recipes.length === 0) {
    return (
      <RecipeGridContainer>
        <EmptyState>
          <EmptyIcon>
            <ChefHat size={32} />
          </EmptyIcon>
          <div>No recipes found</div>
          <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>
            Try adjusting your filters or search terms to discover more recipes
          </div>
        </EmptyState>
      </RecipeGridContainer>
    );
  }

  return (
    <RecipeGridContainer>
      {recipes.map((recipe) => {
        const isFavorite = favorites.includes(recipe.id);

        return (
          <RecipeCard key={recipe.id} onClick={() => handleRecipeClick(recipe)}>
            <RecipeImage image={recipe.image}>
              <CuisineTag>{recipe.cuisine}</CuisineTag>
              <RecipeBadge>{recipe.difficulty}</RecipeBadge>
            </RecipeImage>

            <RecipeContent>
              <RecipeTitle>{recipe.title}</RecipeTitle>
              <RecipeDescription>{recipe.description}</RecipeDescription>

              {recipe.dietaryRestrictions.length > 0 && (
                <DietaryTags>
                  {recipe.dietaryRestrictions.map((restriction) => (
                    <DietaryTag key={restriction}>{restriction}</DietaryTag>
                  ))}
                </DietaryTags>
              )}

              <RecipeMetrics>
                <TimeMetric>
                  <Clock size={16} />
                  {recipe.cookTime}min
                </TimeMetric>
                <ServingsMetric>
                  <Users size={16} />
                  {recipe.servings} servings
                </ServingsMetric>
                <CaloriesMetric>{recipe.calories} cal</CaloriesMetric>
              </RecipeMetrics>

              <RecipeActions>
                <Rating>
                  <RatingStars>{renderStars(recipe.rating)}</RatingStars>
                  <span style={{ marginLeft: "0.5rem" }}>{recipe.rating}</span>
                </Rating>

                <ActionButtons>
                  <ActionButton
                    variant="secondary"
                    isFavorite={isFavorite}
                    onClick={(e) => handleFavoriteClick(e, recipe.id)}
                    title={
                      isFavorite ? "Remove from favorites" : "Add to favorites"
                    }
                  >
                    <Heart
                      size={16}
                      fill={isFavorite ? "currentColor" : "none"}
                    />
                  </ActionButton>
                  <ActionButton variant="primary" title="View recipe details">
                    <Eye size={16} />
                  </ActionButton>
                </ActionButtons>
              </RecipeActions>
            </RecipeContent>
          </RecipeCard>
        );
      })}
    </RecipeGridContainer>
  );
}
