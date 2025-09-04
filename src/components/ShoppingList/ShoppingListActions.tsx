import styled from "@emotion/styled";
import { Package, Trash2, X } from "lucide-react";

const ActionsSection = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button<{
  variant?: "primary" | "secondary" | "danger";
}>`
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex: 1;

  ${(props) => {
    switch (props.variant) {
      case "primary":
        return `
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

          &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          }
        `;
      case "danger":
        return `
          background: linear-gradient(45deg, #ef4444, #dc2626);
          color: white;
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);

          &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
          }
        `;
      default:
        return `
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(5px);

          &:hover:not(:disabled) {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-1px);
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }
`;

interface ShoppingListActionsProps {
  onClearCompleted: () => void;
  onClearAll: () => void;
  onGenerateFromMealPlan: () => void;
  completedItems: number;
  totalItems: number;
}

export function ShoppingListActions({
  onClearCompleted,
  onClearAll,
  onGenerateFromMealPlan,
  completedItems,
  totalItems,
}: ShoppingListActionsProps) {
  return (
    <ActionsSection>
      <ActionButton variant="primary" onClick={onGenerateFromMealPlan}>
        <Package size={20} />
        Generate from Meal Plan
      </ActionButton>
      <ActionButton
        variant="secondary"
        onClick={onClearCompleted}
        disabled={completedItems === 0}
      >
        <Trash2 size={20} />
        Clear Completed ({completedItems})
      </ActionButton>
      <ActionButton
        variant="danger"
        onClick={onClearAll}
        disabled={totalItems === 0}
      >
        <X size={20} />
        Clear All
      </ActionButton>
    </ActionsSection>
  );
}
