import { useState } from "react";
import styled from "@emotion/styled";
import { useShoppingList } from "@/contexts/ShoppingListContext";
import { ShoppingListHeader } from "./ShoppingListHeader";
import { ShoppingListSummary } from "./ShoppingListSummary";
import { ShoppingListActions } from "./ShoppingListActions";
import { ShoppingListCategories } from "./ShoppingListCategories";
import { AvailableIngredients } from "./AvailableIngredients";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const ShoppingSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const IngredientsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export function ShoppingList() {
  const {
    state,
    clearCompleted,
    clearAll,
    generateFromMealPlan,
    getTotalCost,
    getCompletedCount,
    getRemainingCost,
  } = useShoppingList();

  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{
    name: string;
    price: string;
    quantity: string;
  }>({
    name: "",
    price: "",
    quantity: "",
  });

  const summary = {
    totalItems: state.items.length,
    completedItems: getCompletedCount(),
    totalCost: getTotalCost(),
    remainingCost: getRemainingCost(),
  };

  return (
    <ListContainer>
      <ShoppingListHeader />

      <ShoppingListSummary summary={summary} />

      <MainContent>
        <ShoppingSection>
          <ShoppingListActions
            onClearCompleted={clearCompleted}
            onClearAll={clearAll}
            onGenerateFromMealPlan={generateFromMealPlan}
            completedItems={summary.completedItems}
            totalItems={summary.totalItems}
          />

          <ShoppingListCategories
            categories={state.categories}
            items={state.items}
            editingItem={editingItem}
            editValues={editValues}
            setEditingItem={setEditingItem}
            setEditValues={setEditValues}
          />
        </ShoppingSection>

        <IngredientsSection>
          <AvailableIngredients ingredients={state.availableIngredients} />
        </IngredientsSection>
      </MainContent>
    </ListContainer>
  );
}
