import styled from "@emotion/styled";

const Header = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const WelcomeTitle = styled.h1`
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

const WelcomeSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  margin: 0;
`;

export function DashboardHeader() {
  return (
    <Header>
      <WelcomeTitle>Welcome to Your Meal Planner</WelcomeTitle>
      <WelcomeSubtitle>
        Plan, cook, and organize your meals like a pro chef
      </WelcomeSubtitle>
    </Header>
  );
}
