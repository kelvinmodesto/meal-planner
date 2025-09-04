import styled from "@emotion/styled";

const SummarySection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const SummaryCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.2);
  }
`;

const SummaryValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #4ade80;
`;

const SummaryLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

interface SummaryData {
  totalItems: number;
  completedItems: number;
  totalCost: number;
  remainingCost: number;
}

interface ShoppingListSummaryProps {
  summary: SummaryData;
}

export function ShoppingListSummary({ summary }: ShoppingListSummaryProps) {
  return (
    <SummarySection>
      <SummaryGrid>
        <SummaryCard>
          <SummaryValue>{summary.totalItems}</SummaryValue>
          <SummaryLabel>Total Items</SummaryLabel>
        </SummaryCard>
        <SummaryCard>
          <SummaryValue>{summary.completedItems}</SummaryValue>
          <SummaryLabel>Completed</SummaryLabel>
        </SummaryCard>
        <SummaryCard>
          <SummaryValue>${summary.totalCost.toFixed(2)}</SummaryValue>
          <SummaryLabel>Total Cost</SummaryLabel>
        </SummaryCard>
        <SummaryCard>
          <SummaryValue>${summary.remainingCost.toFixed(2)}</SummaryValue>
          <SummaryLabel>Remaining</SummaryLabel>
        </SummaryCard>
      </SummaryGrid>
    </SummarySection>
  );
}
