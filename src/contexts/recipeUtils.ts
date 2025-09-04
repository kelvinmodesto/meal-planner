import type { Recipe, RecipeFilters } from './RecipeTypes';

export function applyFilters(recipes: Recipe[], filters: RecipeFilters): Recipe[] {
  let filtered = [...recipes];

  // Apply search filter
  if (filters.searchTerm) {
    const searchLower = filters.searchTerm.toLowerCase();
    filtered = filtered.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(searchLower) ||
        recipe.description.toLowerCase().includes(searchLower) ||
        recipe.cuisine.toLowerCase().includes(searchLower)
    );
  }

  // Apply cuisine filter
  if (filters.selectedCuisine) {
    filtered = filtered.filter(
      (recipe) => recipe.cuisine === filters.selectedCuisine
    );
  }

  // Apply dietary restrictions filter
  if (filters.selectedDietary) {
    filtered = filtered.filter((recipe) =>
      recipe.dietaryRestrictions.includes(filters.selectedDietary)
    );
  }

  // Apply cook time filter
  if (filters.maxCookTime) {
    const maxTime = parseInt(filters.maxCookTime);
    filtered = filtered.filter((recipe) => recipe.cookTime <= maxTime);
  }

  // Apply sorting
  filtered.sort((a, b) => {
    switch (filters.sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "cookTime":
        return a.cookTime - b.cookTime;
      case "title":
        return a.title.localeCompare(b.title);
      case "calories":
        return a.calories - b.calories;
      default:
        return 0;
    }
  });

  return filtered;
}

export function getCuisines(recipes: Recipe[]): string[] {
  return [...new Set(recipes.map((recipe) => recipe.cuisine))];
}

export function getDietaryOptions(recipes: Recipe[]): string[] {
  return [
    ...new Set(recipes.flatMap((recipe) => recipe.dietaryRestrictions)),
  ];
}

export function getFavoriteRecipes(recipes: Recipe[], favoriteIds: number[]): Recipe[] {
  return recipes.filter((recipe) => favoriteIds.includes(recipe.id));
}
