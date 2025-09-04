import { useRecipe } from "@/contexts/useRecipe";
import { RecipeGalleryHeader } from "./RecipeGalleryHeader";
import { RecipeFilters } from "./RecipeFilters";
import { RecipeGrid } from "./RecipeGrid";
import { RecipeModal } from "./RecipeModal";
import styled from "@emotion/styled";

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export function RecipeGallery() {
  const { state } = useRecipe();

  if (state.isLoading) {
    return (
      <GalleryContainer>
        <RecipeGalleryHeader />
        <div style={{ color: "white", textAlign: "center", padding: "2rem" }}>
          Loading recipes...
        </div>
      </GalleryContainer>
    );
  }

  return (
    <GalleryContainer>
      <RecipeGalleryHeader />

      <MainContent>
        <RecipeFilters />
        <RecipeGrid
          recipes={state.filteredRecipes}
          favorites={state.favoriteRecipes}
        />
      </MainContent>

      {state.selectedRecipe && (
        <RecipeModal
          recipe={state.selectedRecipe}
          isFavorite={state.favoriteRecipes.includes(state.selectedRecipe.id)}
        />
      )}
    </GalleryContainer>
  );
}
