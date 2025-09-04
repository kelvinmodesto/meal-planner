export interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  cuisine: string;
  cookTime: number;
  servings: number;
  rating: number;
  difficulty: "Easy" | "Medium" | "Hard";
  dietaryRestrictions: string[];
  ingredients: string[];
  instructions: string[];
  calories: number;
  prepTime: number;
}

export interface RecipeFilters {
  searchTerm: string;
  selectedCuisine: string;
  selectedDietary: string;
  maxCookTime: string;
  sortBy: string;
}

export interface RecipeState {
  recipes: Recipe[];
  filteredRecipes: Recipe[];
  filters: RecipeFilters;
  selectedRecipe: Recipe | null;
  favoriteRecipes: number[];
  isLoading: boolean;
}

export type RecipeAction =
  | { type: "SET_RECIPES"; payload: Recipe[] }
  | { type: "SET_FILTERED_RECIPES"; payload: Recipe[] }
  | { type: "UPDATE_FILTERS"; payload: Partial<RecipeFilters> }
  | { type: "SET_SELECTED_RECIPE"; payload: Recipe | null }
  | { type: "TOGGLE_FAVORITE"; payload: number }
  | { type: "ADD_RECIPE"; payload: Recipe }
  | { type: "UPDATE_RECIPE"; payload: { id: number; updates: Partial<Recipe> } }
  | { type: "DELETE_RECIPE"; payload: number }
  | { type: "SET_LOADING"; payload: boolean };

export interface RecipeContextType {
  state: RecipeState;
  updateFilters: (filters: Partial<RecipeFilters>) => void;
  setSelectedRecipe: (recipe: Recipe | null) => void;
  toggleFavorite: (recipeId: number) => void;
  addRecipe: (recipe: Recipe) => void;
  updateRecipe: (id: number, updates: Partial<Recipe>) => void;
  deleteRecipe: (id: number) => void;
  setLoading: (loading: boolean) => void;
  getCuisines: () => string[];
  getDietaryOptions: () => string[];
  getFavoriteRecipes: () => Recipe[];
  resetFilters: () => void;
}
