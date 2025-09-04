import styled from "@emotion/styled";

const Header = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
`;

export function ShoppingListHeader() {
  return (
    <Header>
      <Title>Smart Shopping List</Title>
      <Subtitle>
        Organize your grocery shopping with intelligent categorization and
        cost tracking. Add ingredients from our curated list or create your own.
      </Subtitle>
    </Header>
  );
}
