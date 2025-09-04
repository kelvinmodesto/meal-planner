import type { ReactNode } from "react";
import { useReducer } from "react";
import type {
  Recipe,
  RecipeState,
  RecipeAction,
  RecipeFilters,
} from "./RecipeTypes";
import { initialState } from "./mockRecipes";
import {
  applyFilters,
  getCuisines,
  getDietaryOptions,
  getFavoriteRecipes,
} from "./recipeUtils";
import { RecipeContext } from "./RecipeContextInstance";

function recipeReducer(state: RecipeState, action: RecipeAction): RecipeState {
  switch (action.type) {
    case "SET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        filteredRecipes: applyFilters(action.payload, state.filters),
      };

    case "SET_FILTERED_RECIPES":
      return {
        ...state,
        filteredRecipes: action.payload,
      };

    case "UPDATE_FILTERS": {
      const newFilters = { ...state.filters, ...action.payload };
      return {
        ...state,
        filters: newFilters,
        filteredRecipes: applyFilters(state.recipes, newFilters),
      };
    }

    case "SET_SELECTED_RECIPE":
      return {
        ...state,
        selectedRecipe: action.payload,
      };

    case "TOGGLE_FAVORITE": {
      const recipeId = action.payload;
      const isFavorite = state.favoriteRecipes.includes(recipeId);
      const newFavorites = isFavorite
        ? state.favoriteRecipes.filter((id) => id !== recipeId)
        : [...state.favoriteRecipes, recipeId];

      return {
        ...state,
        favoriteRecipes: newFavorites,
      };
    }

    case "ADD_RECIPE": {
      const newRecipes = [...state.recipes, action.payload];
      return {
        ...state,
        recipes: newRecipes,
        filteredRecipes: applyFilters(newRecipes, state.filters),
      };
    }

    case "UPDATE_RECIPE": {
      const { id, updates } = action.payload;
      const newRecipes = state.recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, ...updates } : recipe,
      );
      return {
        ...state,
        recipes: newRecipes,
        filteredRecipes: applyFilters(newRecipes, state.filters),
      };
    }

    case "DELETE_RECIPE": {
      const newRecipes = state.recipes.filter(
        (recipe) => recipe.id !== action.payload,
      );
      return {
        ...state,
        recipes: newRecipes,
        filteredRecipes: applyFilters(newRecipes, state.filters),
        favoriteRecipes: state.favoriteRecipes.filter(
          (id) => id !== action.payload,
        ),
        selectedRecipe:
          state.selectedRecipe?.id === action.payload
            ? null
            : state.selectedRecipe,
      };
    }

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
}

export function RecipeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(recipeReducer, initialState);

  const updateFilters = (filters: Partial<RecipeFilters>) => {
    dispatch({ type: "UPDATE_FILTERS", payload: filters });
  };

  const setSelectedRecipe = (recipe: Recipe | null) => {
    dispatch({ type: "SET_SELECTED_RECIPE", payload: recipe });
  };

  const toggleFavorite = (recipeId: number) => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: recipeId });
  };

  const addRecipe = (recipe: Recipe) => {
    dispatch({ type: "ADD_RECIPE", payload: recipe });
  };

  const updateRecipe = (id: number, updates: Partial<Recipe>) => {
    dispatch({ type: "UPDATE_RECIPE", payload: { id, updates } });
  };

  const deleteRecipe = (id: number) => {
    dispatch({ type: "DELETE_RECIPE", payload: id });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  };

  const value = {
    state,
    updateFilters,
    setSelectedRecipe,
    toggleFavorite,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    setLoading,
    getCuisines: () => getCuisines(state.recipes),
    getDietaryOptions: () => getDietaryOptions(state.recipes),
    getFavoriteRecipes: () =>
      getFavoriteRecipes(state.recipes, state.favoriteRecipes),
    resetFilters: () => updateFilters({}),
  };

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
}
