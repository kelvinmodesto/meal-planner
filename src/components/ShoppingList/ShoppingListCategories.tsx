import { useState } from "react";
import styled from "@emotion/styled";
import { Plus, Trash2, Check, Edit3, Save, X } from "lucide-react";
import {
  useShoppingList,
  type ShoppingListItem,
  type Category,
} from "@/contexts/ShoppingListContext";

const CategoriesGrid = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
`;

const CategorySection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  color: white;
`;

const CategoryTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CategoryIcon = styled.div<{ color: string }>`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const CategoryTotal = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #4ade80;
`;

const AddItemSection = styled.div`
  margin-bottom: 1rem;
`;

const AddItemForm = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ItemInput = styled.input`
  flex: 2;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.9rem;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.3);
  }
`;

const PriceInput = styled.input`
  flex: 1;
  min-width: 80px;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.9rem;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.3);
  }
`;

const QuantityInput = styled.input`
  flex: 0.8;
  min-width: 60px;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.9rem;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.3);
  }
`;

const AddButton = styled.button`
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  background: rgba(102, 126, 234, 0.8);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;

  &:hover:not(:disabled) {
    background: rgba(102, 126, 234, 1);
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 100px;
`;

const ShoppingItem = styled.div<{ completed: boolean; editing: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(255, 255, 255, ${(props) => (props.editing ? 0.15 : 0.1)});
  border-radius: 10px;
  border: 1px solid
    rgba(255, 255, 255, ${(props) => (props.editing ? 0.4 : 0.2)});
  transition: all 0.3s ease;
  opacity: ${(props) => (props.completed ? 0.7 : 1)};

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CheckboxButton = styled.button<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: ${(props) =>
    props.checked ? "rgba(34, 197, 94, 0.8)" : "transparent"};
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:hover {
    border-color: rgba(255, 255, 255, 0.8);
    background: ${(props) =>
      props.checked ? "rgba(34, 197, 94, 1)" : "rgba(255, 255, 255, 0.1)"};
    transform: scale(1.1);
  }
`;

const ItemContent = styled.div<{ completed: boolean }>`
  flex: 1;
  color: white;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
`;

const ItemName = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
  font-size: 1rem;
`;

const ItemDetails = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const ItemPrice = styled.div`
  color: #4ade80;
  font-weight: 500;
`;

const ItemQuantity = styled.div`
  color: #fbbf24;
  font-weight: 500;
`;

const EditInput = styled.input`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 4px;
  color: white;
  padding: 0.25rem 0.5rem;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  width: 100%;

  &:focus {
    outline: none;
    border-color: rgba(102, 126, 234, 0.6);
  }
`;

const ItemActions = styled.div`
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ShoppingItem}:hover & {
    opacity: 1;
  }
`;

const ActionIcon = styled.button<{
  variant?: "edit" | "delete" | "save" | "cancel";
}>`
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
    ${(props) => {
      switch (props.variant) {
        case "delete":
          return "background: rgba(239, 68, 68, 0.8);";
        case "save":
          return "background: rgba(34, 197, 94, 0.8);";
        case "cancel":
          return "background: rgba(156, 163, 175, 0.8);";
        default:
          return "background: rgba(102, 126, 234, 0.8);";
      }
    }}
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  text-align: center;
  min-height: 100px;
  gap: 0.5rem;
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 1rem;
`;

interface CategoryInputs {
  [categoryName: string]: {
    name: string;
    price: string;
    quantity: string;
  };
}

interface EditValues {
  name: string;
  price: string;
  quantity: string;
}

interface ShoppingListCategoriesProps {
  categories: Category[];
  items: ShoppingListItem[];
  editingItem: string | null;
  editValues: EditValues;
  setEditingItem: (id: string | null) => void;
  setEditValues: (values: EditValues) => void;
}

export function ShoppingListCategories({
  categories,
  items,
  editingItem,
  editValues,
  setEditingItem,
  setEditValues,
}: ShoppingListCategoriesProps) {
  const { addItem, updateItem, deleteItem, toggleItem, getItemsByCategory } =
    useShoppingList();

  const [categoryInputs, setCategoryInputs] = useState<CategoryInputs>({});

  const updateCategoryInput = (
    categoryName: string,
    field: "name" | "price" | "quantity",
    value: string,
  ) => {
    setCategoryInputs((prev) => ({
      ...prev,
      [categoryName]: {
        ...prev[categoryName],
        [field]: value,
      },
    }));
  };

  const addItemToCategory = (e: React.FormEvent, categoryName: string) => {
    e.preventDefault();
    const input = categoryInputs[categoryName];

    if (
      input &&
      input.name.trim() &&
      input.price.trim() &&
      input.quantity.trim()
    ) {
      const price = parseFloat(input.price);
      const quantity = parseFloat(input.quantity);

      if (isNaN(price) || price < 0 || isNaN(quantity) || quantity <= 0) return;

      addItem({
        name: input.name.trim(),
        category: categoryName,
        price: price,
        quantity: quantity,
        unit: "items",
        completed: false,
      });

      setCategoryInputs((prev) => ({
        ...prev,
        [categoryName]: { name: "", price: "", quantity: "1" },
      }));
    }
  };

  const startEdit = (item: ShoppingListItem) => {
    setEditingItem(item.id);
    setEditValues({
      name: item.name,
      price: item.price.toString(),
      quantity: item.quantity.toString(),
    });
  };

  const saveEdit = (id: string) => {
    if (
      editValues.name.trim() &&
      editValues.price.trim() &&
      editValues.quantity.trim()
    ) {
      const price = parseFloat(editValues.price);
      const quantity = parseFloat(editValues.quantity);

      if (!isNaN(price) && price >= 0 && !isNaN(quantity) && quantity > 0) {
        updateItem(id, {
          name: editValues.name.trim(),
          price: price,
          quantity: quantity,
        });
      }
    }
    setEditingItem(null);
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setEditValues({ name: "", price: "", quantity: "" });
  };

  return (
    <CategoriesGrid>
      {categories.map((category) => {
        const categoryItems = getItemsByCategory(category.name);
        const categoryTotal = categoryItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );
        const categoryInput = categoryInputs[category.name] || {
          name: "",
          price: "",
          quantity: "1",
        };

        return (
          <CategorySection key={category.name}>
            <CategoryHeader>
              <CategoryTitle>
                <CategoryIcon color={category.color}>
                  {category.icon}
                </CategoryIcon>
                {category.name} ({categoryItems.length})
              </CategoryTitle>
              <CategoryTotal>${categoryTotal.toFixed(2)}</CategoryTotal>
            </CategoryHeader>

            <AddItemSection>
              <AddItemForm
                onSubmit={(e) => addItemToCategory(e, category.name)}
              >
                <ItemInput
                  type="text"
                  placeholder="Add item..."
                  value={categoryInput.name}
                  onChange={(e) =>
                    updateCategoryInput(category.name, "name", e.target.value)
                  }
                />
                <QuantityInput
                  type="number"
                  step="0.1"
                  min="0.1"
                  placeholder="Qty"
                  value={categoryInput.quantity}
                  onChange={(e) =>
                    updateCategoryInput(
                      category.name,
                      "quantity",
                      e.target.value,
                    )
                  }
                />
                <PriceInput
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="$0.00"
                  value={categoryInput.price}
                  onChange={(e) =>
                    updateCategoryInput(category.name, "price", e.target.value)
                  }
                />
                <AddButton
                  type="submit"
                  disabled={
                    !categoryInput.name.trim() ||
                    !categoryInput.price.trim() ||
                    !categoryInput.quantity.trim()
                  }
                >
                  <Plus size={16} />
                </AddButton>
              </AddItemForm>
            </AddItemSection>

            <ItemsList>
              {categoryItems.length > 0 ? (
                categoryItems.map((item) => (
                  <ShoppingItem
                    key={item.id}
                    completed={item.completed}
                    editing={editingItem === item.id}
                  >
                    <CheckboxButton
                      checked={item.completed}
                      onClick={() => toggleItem(item.id)}
                    >
                      {item.completed && <Check size={14} />}
                    </CheckboxButton>

                    <ItemContent completed={item.completed}>
                      {editingItem === item.id ? (
                        <>
                          <EditInput
                            value={editValues.name}
                            onChange={(e) =>
                              setEditValues({
                                ...editValues,
                                name: e.target.value,
                              })
                            }
                            placeholder="Item name"
                          />
                          <div style={{ display: "flex", gap: "0.5rem" }}>
                            <EditInput
                              type="number"
                              step="0.1"
                              min="0.1"
                              value={editValues.quantity}
                              onChange={(e) =>
                                setEditValues({
                                  ...editValues,
                                  quantity: e.target.value,
                                })
                              }
                              placeholder="Quantity"
                              style={{ width: "80px" }}
                            />
                            <EditInput
                              type="number"
                              step="0.01"
                              min="0"
                              value={editValues.price}
                              onChange={(e) =>
                                setEditValues({
                                  ...editValues,
                                  price: e.target.value,
                                })
                              }
                              placeholder="Price"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <ItemName>{item.name}</ItemName>
                          <ItemDetails>
                            <ItemQuantity>
                              {item.quantity} {item.unit}
                            </ItemQuantity>
                            <ItemPrice>
                              ${(item.price * item.quantity).toFixed(2)}
                            </ItemPrice>
                          </ItemDetails>
                        </>
                      )}
                    </ItemContent>

                    <ItemActions>
                      {editingItem === item.id ? (
                        <>
                          <ActionIcon
                            variant="save"
                            onClick={() => saveEdit(item.id)}
                          >
                            <Save size={14} />
                          </ActionIcon>
                          <ActionIcon variant="cancel" onClick={cancelEdit}>
                            <X size={14} />
                          </ActionIcon>
                        </>
                      ) : (
                        <>
                          <ActionIcon
                            variant="edit"
                            onClick={() => startEdit(item)}
                          >
                            <Edit3 size={14} />
                          </ActionIcon>
                          <ActionIcon
                            variant="delete"
                            onClick={() => deleteItem(item.id)}
                          >
                            <Trash2 size={14} />
                          </ActionIcon>
                        </>
                      )}
                    </ItemActions>
                  </ShoppingItem>
                ))
              ) : (
                <EmptyState>
                  <Plus size={24} opacity={0.5} />
                  <div>No items in this category</div>
                  <div style={{ fontSize: "0.8rem", opacity: 0.7 }}>
                    Add your first item above
                  </div>
                </EmptyState>
              )}
            </ItemsList>
          </CategorySection>
        );
      })}
    </CategoriesGrid>
  );
}
