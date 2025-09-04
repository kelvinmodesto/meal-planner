import { useState } from "react";
import styled from "@emotion/styled";
import { Plus, Search, Filter } from "lucide-react";
import {
  useShoppingList,
  type ShoppingListItem,
} from "@/contexts/ShoppingListContext";

const IngredientsContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  height: fit-content;
`;

const IngredientsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Title = styled.h3`
  color: white;
  margin: 0;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TitleIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(45deg, #10b981, #059669);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
`;

const FilterSection = styled.div`
  margin-bottom: 1rem;
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 0.75rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.9rem;
  backdrop-filter: blur(5px);

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
`;

const CategoryFilter = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
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

const IngredientsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 600px;
  overflow-y: auto;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

const IngredientItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const IngredientInfo = styled.div`
  flex: 1;
  color: white;
`;

const IngredientName = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
  font-size: 0.95rem;
`;

const IngredientDetails = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
  opacity: 0.8;
`;

const IngredientPrice = styled.div`
  color: #4ade80;
  font-weight: 500;
`;

const IngredientQuantity = styled.div`
  color: #fbbf24;
`;

const IngredientCategory = styled.div`
  color: #a78bfa;
`;

const AddToCartButton = styled.button`
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  background: rgba(16, 185, 129, 0.8);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;

  &:hover {
    background: rgba(16, 185, 129, 1);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ResultCount = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  text-align: center;
  padding: 2rem;
  gap: 0.5rem;
`;

interface AvailableIngredientsProps {
  ingredients: ShoppingListItem[];
}

export function AvailableIngredients({
  ingredients,
}: AvailableIngredientsProps) {
  const { addIngredientToCart } = useShoppingList();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Get unique categories for filter
  const categories = [
    ...new Set(ingredients.map((ingredient) => ingredient.category)),
  ];

  // Filter ingredients based on search and category
  const filteredIngredients = ingredients.filter((ingredient) => {
    const matchesSearch = ingredient.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || ingredient.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (ingredientId: string) => {
    addIngredientToCart(ingredientId);
  };

  return (
    <IngredientsContainer>
      <IngredientsHeader>
        <Title>
          <TitleIcon>🛒</TitleIcon>
          Available Ingredients
        </Title>
      </IngredientsHeader>

      <FilterSection>
        <SearchContainer>
          <SearchIcon>
            <Search size={16} />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>

        <CategoryFilter
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </CategoryFilter>
      </FilterSection>

      <ResultCount>
        Showing {filteredIngredients.length} of {ingredients.length} ingredients
      </ResultCount>

      <IngredientsList>
        {filteredIngredients.length > 0 ? (
          filteredIngredients.map((ingredient) => (
            <IngredientItem key={ingredient.id}>
              <IngredientInfo>
                <IngredientName>{ingredient.name}</IngredientName>
                <IngredientDetails>
                  <IngredientQuantity>
                    {ingredient.quantity} {ingredient.unit}
                  </IngredientQuantity>
                  <IngredientPrice>
                    ${(ingredient.price * ingredient.quantity).toFixed(2)}
                  </IngredientPrice>
                  <IngredientCategory>{ingredient.category}</IngredientCategory>
                </IngredientDetails>
              </IngredientInfo>
              <AddToCartButton
                onClick={() => handleAddToCart(ingredient.id)}
                title="Add to cart"
              >
                <Plus size={16} />
              </AddToCartButton>
            </IngredientItem>
          ))
        ) : (
          <EmptyState>
            <Filter size={24} opacity={0.5} />
            <div>No ingredients found</div>
            <div style={{ fontSize: "0.8rem", opacity: 0.7 }}>
              Try adjusting your search or filter
            </div>
          </EmptyState>
        )}
      </IngredientsList>
    </IngredientsContainer>
  );
}
