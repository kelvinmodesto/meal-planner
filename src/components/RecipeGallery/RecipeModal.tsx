import styled from "@emotion/styled";
import { X, Clock, Users, Star, Heart, ChefHat, Calendar } from "lucide-react";
import type { Recipe } from "@/contexts/RecipeTypes";
import { useRecipe } from "@/contexts/useRecipe";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    margin: 1rem;
    max-height: calc(100vh - 2rem);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #333;
  transition: all 0.2s ease;
  z-index: 10;

  &:hover {
    background: rgba(0, 0, 0, 0.3);
    transform: scale(1.1);
  }
`;

const RecipeHeader = styled.div`
  position: relative;
  height: 300px;
  background-size: cover;
  background-position: center;
  border-radius: 20px 20px 0 0;
  display: flex;
  align-items: flex-end;
  padding: 2rem;

  @media (max-width: 768px) {
    height: 200px;
    padding: 1rem;
  }
`;

const HeaderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6));
  border-radius: 20px 20px 0 0;
`;

const RecipeHeaderContent = styled.div`
  color: white;
  z-index: 1;
  position: relative;
`;

const RecipeTitle = styled.h1`
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const RecipeSubtitle = styled.p`
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CuisineBadge = styled.div`
  background: rgba(102, 126, 234, 0.9);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  position: absolute;
  top: 1rem;
  left: 1rem;
  backdrop-filter: blur(5px);
`;

const RecipeBody = styled.div`
  padding: 2rem;
  color: #333;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const MetricsRow = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(103, 126, 234, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(103, 126, 234, 0.2);

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem;
  }
`;

const Metric = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
`;

const MetricIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(103, 126, 234, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
`;

const MetricValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const MetricLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
  text-align: center;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button<{
  variant?: "primary" | "secondary" | "favorite";
  isFavorite?: boolean;
}>`
  flex: 1;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  ${(props) => {
    if (props.variant === "favorite" && props.isFavorite) {
      return `
        background: linear-gradient(45deg, #ef4444, #dc2626);
        color: white;
        box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
        }
      `;
    }

    if (props.variant === "primary") {
      return `
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }
      `;
    }

    return `
      background: rgba(103, 126, 234, 0.1);
      color: #667eea;
      border: 1px solid rgba(103, 126, 234, 0.3);

      &:hover {
        background: rgba(103, 126, 234, 0.2);
        transform: translateY(-1px);
      }
    `;
  }}
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Section = styled.div`
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h3`
  font-size: 1.3rem;
  margin: 0 0 1rem 0;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const IngredientsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const IngredientItem = styled.li`
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:last-child {
    border-bottom: none;
  }

  &:before {
    content: "•";
    color: #667eea;
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

const InstructionsList = styled.ol`
  padding: 0;
  margin: 0;
`;

const InstructionItem = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  line-height: 1.6;

  &:last-child {
    border-bottom: none;
  }
`;

const DietaryTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const DietaryTag = styled.span`
  background: rgba(34, 197, 94, 0.2);
  color: #16a34a;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(34, 197, 94, 0.3);
`;

const NutritionInfo = styled.div`
  background: rgba(118, 75, 162, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(118, 75, 162, 0.2);
  grid-column: 1 / -1;
`;

const NutritionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  text-align: center;
`;

const NutritionItem = styled.div`
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  padding: 1rem;
`;

const NutritionValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #764ba2;
`;

const NutritionLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
  margin-top: 0.25rem;
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const RatingStars = styled.div`
  display: flex;
  gap: 0.1rem;
`;

const RatingValue = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
`;

interface RecipeModalProps {
  recipe: Recipe;
  isFavorite: boolean;
}

export function RecipeModal({ recipe, isFavorite }: RecipeModalProps) {
  const { setSelectedRecipe, toggleFavorite } = useRecipe();
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedRecipe(null);
    }
  };

  const handleClose = () => {
    setSelectedRecipe(null);
  };

  const handleFavoriteToggle = () => {
    toggleFavorite(recipe.id);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} fill="currentColor" />);
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          size={16}
          fill="currentColor"
          style={{ opacity: 0.5 }}
        />,
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={16} style={{ opacity: 0.3 }} />,
      );
    }

    return stars;
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <CloseButton onClick={handleClose}>
          <X size={20} />
        </CloseButton>

        <RecipeHeader style={{ backgroundImage: `url(${recipe.image})` }}>
          <HeaderOverlay />
          <CuisineBadge>{recipe.cuisine}</CuisineBadge>
          <RecipeHeaderContent>
            <RecipeTitle>{recipe.title}</RecipeTitle>
            <RecipeSubtitle>{recipe.description}</RecipeSubtitle>
          </RecipeHeaderContent>
        </RecipeHeader>

        <RecipeBody>
          <RatingSection>
            <RatingStars>{renderStars(recipe.rating)}</RatingStars>
            <RatingValue>{recipe.rating}</RatingValue>
            <span style={{ opacity: 0.7 }}>
              ({Math.floor(recipe.rating * 127)} reviews)
            </span>
          </RatingSection>

          <DietaryTags>
            {recipe.dietaryRestrictions.map((tag) => (
              <DietaryTag key={tag}>{tag}</DietaryTag>
            ))}
            <DietaryTag>{recipe.difficulty}</DietaryTag>
          </DietaryTags>

          <MetricsRow>
            <Metric>
              <MetricIcon>
                <Clock size={24} />
              </MetricIcon>
              <MetricValue>{recipe.prepTime + recipe.cookTime}min</MetricValue>
              <MetricLabel>Total Time</MetricLabel>
            </Metric>
            <Metric>
              <MetricIcon>
                <ChefHat size={24} />
              </MetricIcon>
              <MetricValue>{recipe.cookTime}min</MetricValue>
              <MetricLabel>Cook Time</MetricLabel>
            </Metric>
            <Metric>
              <MetricIcon>
                <Users size={24} />
              </MetricIcon>
              <MetricValue>{recipe.servings}</MetricValue>
              <MetricLabel>Servings</MetricLabel>
            </Metric>
            <Metric>
              <MetricIcon>
                <Star size={24} />
              </MetricIcon>
              <MetricValue>{recipe.calories}</MetricValue>
              <MetricLabel>Calories</MetricLabel>
            </Metric>
          </MetricsRow>

          <ActionRow>
            <ActionButton variant="primary">
              <Calendar size={20} />
              Add to Meal Plan
            </ActionButton>
            <ActionButton
              variant="favorite"
              isFavorite={isFavorite}
              onClick={handleFavoriteToggle}
            >
              <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
              {isFavorite ? "Remove from Favorites" : "Save to Favorites"}
            </ActionButton>
          </ActionRow>

          <ContentGrid>
            <Section>
              <SectionTitle>
                Ingredients ({recipe.ingredients.length})
              </SectionTitle>
              <IngredientsList>
                {recipe.ingredients.map((ingredient, index) => (
                  <IngredientItem key={index}>{ingredient}</IngredientItem>
                ))}
              </IngredientsList>
            </Section>

            <Section>
              <SectionTitle>
                Instructions ({recipe.instructions.length} steps)
              </SectionTitle>
              <InstructionsList>
                {recipe.instructions.map((instruction, index) => (
                  <InstructionItem key={index}>{instruction}</InstructionItem>
                ))}
              </InstructionsList>
            </Section>

            <NutritionInfo>
              <SectionTitle>Nutrition Information</SectionTitle>
              <NutritionGrid>
                <NutritionItem>
                  <NutritionValue>{recipe.calories}</NutritionValue>
                  <NutritionLabel>Calories</NutritionLabel>
                </NutritionItem>
                <NutritionItem>
                  <NutritionValue>
                    {Math.round((recipe.calories * 0.4) / 4)}
                  </NutritionValue>
                  <NutritionLabel>Protein (g)</NutritionLabel>
                </NutritionItem>
                <NutritionItem>
                  <NutritionValue>
                    {Math.round((recipe.calories * 0.3) / 4)}
                  </NutritionValue>
                  <NutritionLabel>Carbs (g)</NutritionLabel>
                </NutritionItem>
                <NutritionItem>
                  <NutritionValue>
                    {Math.round((recipe.calories * 0.3) / 9)}
                  </NutritionValue>
                  <NutritionLabel>Fat (g)</NutritionLabel>
                </NutritionItem>
              </NutritionGrid>
            </NutritionInfo>
          </ContentGrid>
        </RecipeBody>
      </ModalContent>
    </ModalOverlay>
  );
}
