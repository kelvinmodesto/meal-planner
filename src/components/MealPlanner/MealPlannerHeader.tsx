import styled from "@emotion/styled";

const Header = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 1024px) {
    padding: 1.75rem;
    border-radius: 14px;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
    border-radius: 10px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;

  @media (max-width: 1024px) {
    font-size: 2.25rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  @media (max-width: 320px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
  line-height: 1.4;

  @media (max-width: 1024px) {
    font-size: 1.05rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    text-align: center;
    padding: 0 0.5rem;
  }

  @media (max-width: 320px) {
    font-size: 0.85rem;
  }
`;

export function MealPlannerHeader() {
  return (
    <Header>
      <Title>Weekly Meal Planner</Title>
      <Subtitle>
        Plan your meals for the entire week and stay organized with smart
        scheduling
      </Subtitle>
    </Header>
  );
}
