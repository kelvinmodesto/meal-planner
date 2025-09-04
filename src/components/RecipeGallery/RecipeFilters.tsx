import styled from "@emotion/styled";
import { Search, Filter, RotateCcw } from "lucide-react";
import { useRecipe } from "@/contexts/useRecipe";

const FiltersSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const FiltersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  color: white;
`;

const FiltersTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ResetButton = styled.button`
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.5rem 1rem;
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
`;

const FiltersRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 250px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.3);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
`;

const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  backdrop-filter: blur(5px);
  min-width: 150px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.3);
  }

  option {
    background: #333;
    color: white;
  }
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
`;

const ResultsCount = styled.div`
  font-size: 1rem;
  opacity: 0.9;
`;

const SortSelect = styled.select`
  padding: 0.5rem 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.9rem;
  backdrop-filter: blur(5px);

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
  }

  option {
    background: #333;
    color: white;
  }
`;

const ActiveFiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ActiveFilter = styled.div`
  background: rgba(102, 126, 234, 0.3);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(102, 126, 234, 0.5);
`;

const RemoveFilterButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export function RecipeFilters() {
  const { state, updateFilters, getCuisines, getDietaryOptions, resetFilters } =
    useRecipe();

  const cuisines = getCuisines();
  const dietaryOptions = getDietaryOptions();
  const { filters, filteredRecipes, recipes } = state;

  const handleSearchChange = (searchTerm: string) => {
    updateFilters({ searchTerm });
  };

  const handleCuisineChange = (selectedCuisine: string) => {
    updateFilters({ selectedCuisine });
  };

  const handleDietaryChange = (selectedDietary: string) => {
    updateFilters({ selectedDietary });
  };

  const handleCookTimeChange = (maxCookTime: string) => {
    updateFilters({ maxCookTime });
  };

  const handleSortChange = (sortBy: string) => {
    updateFilters({ sortBy });
  };

  const removeFilter = (filterType: keyof typeof filters) => {
    updateFilters({ [filterType]: "" });
  };

  const getActiveFilters = () => {
    const active = [];
    if (filters.searchTerm)
      active.push({
        type: "searchTerm",
        label: `Search: "${filters.searchTerm}"`,
      });
    if (filters.selectedCuisine)
      active.push({
        type: "selectedCuisine",
        label: `Cuisine: ${filters.selectedCuisine}`,
      });
    if (filters.selectedDietary)
      active.push({
        type: "selectedDietary",
        label: `Dietary: ${filters.selectedDietary}`,
      });
    if (filters.maxCookTime)
      active.push({
        type: "maxCookTime",
        label: `Max time: ${filters.maxCookTime}min`,
      });
    return active;
  };

  const activeFilters = getActiveFilters();

  return (
    <FiltersSection>
      <FiltersHeader>
        <FiltersTitle>
          <Filter size={20} />
          Filter & Search
        </FiltersTitle>
        {activeFilters.length > 0 && (
          <ResetButton onClick={resetFilters}>
            <RotateCcw size={16} />
            Reset Filters
          </ResetButton>
        )}
      </FiltersHeader>

      <FiltersRow>
        <SearchContainer>
          <SearchIcon>
            <Search size={20} />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search recipes, cuisine, or ingredients..."
            value={filters.searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </SearchContainer>

        <FilterSelect
          value={filters.selectedCuisine}
          onChange={(e) => handleCuisineChange(e.target.value)}
        >
          <option value="">All Cuisines</option>
          {cuisines.map((cuisine) => (
            <option key={cuisine} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect
          value={filters.selectedDietary}
          onChange={(e) => handleDietaryChange(e.target.value)}
        >
          <option value="">All Dietary</option>
          {dietaryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect
          value={filters.maxCookTime}
          onChange={(e) => handleCookTimeChange(e.target.value)}
        >
          <option value="">Any Cook Time</option>
          <option value="15">Under 15 min</option>
          <option value="30">Under 30 min</option>
          <option value="45">Under 45 min</option>
          <option value="60">Under 1 hour</option>
          <option value="90">Under 1.5 hours</option>
        </FilterSelect>
      </FiltersRow>

      {activeFilters.length > 0 && (
        <ActiveFiltersContainer>
          {activeFilters.map((filter) => (
            <ActiveFilter key={filter.type}>
              {filter.label}
              <RemoveFilterButton
                onClick={() =>
                  removeFilter(filter.type as keyof typeof filters)
                }
                title="Remove filter"
              >
                ×
              </RemoveFilterButton>
            </ActiveFilter>
          ))}
        </ActiveFiltersContainer>
      )}

      <ResultsHeader>
        <ResultsCount>
          Showing {filteredRecipes.length} of {recipes.length} recipes
        </ResultsCount>
        <SortSelect
          value={filters.sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="rating">Sort by Rating</option>
          <option value="cookTime">Sort by Cook Time</option>
          <option value="title">Sort by Name</option>
          <option value="calories">Sort by Calories</option>
        </SortSelect>
      </ResultsHeader>
    </FiltersSection>
  );
}
