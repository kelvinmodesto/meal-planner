import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import type { QuickAction } from "@/contexts/DashboardContext";

const QuickActionsSection = styled.div`
  margin-top: 1rem;
`;

const SectionTitle = styled.h2`
  color: white;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const ActionCard = styled(Link)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  color: white;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  display: block;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
`;

const ActionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ActionIcon = styled.div<{ color: string }>`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(
    45deg,
    ${(props) => props.color},
    ${(props) => props.color}99
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 15px ${(props) => props.color}33;
`;

const ActionTitle = styled.h3`
  margin: 0;
  font-size: 1.3rem;
`;

const ActionDescription = styled.p`
  margin: 0;
  opacity: 0.9;
  line-height: 1.5;
`;

interface QuickActionsProps {
  actions: QuickAction[];
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <QuickActionsSection>
      <SectionTitle>Quick Actions</SectionTitle>
      <QuickActionsGrid>
        {actions.map((action) => (
          <ActionCard key={action.id} to={action.path}>
            <ActionHeader>
              <ActionIcon color={action.color}>{action.icon}</ActionIcon>
              <ActionTitle>{action.title}</ActionTitle>
            </ActionHeader>
            <ActionDescription>{action.description}</ActionDescription>
          </ActionCard>
        ))}
      </QuickActionsGrid>
    </QuickActionsSection>
  );
}
