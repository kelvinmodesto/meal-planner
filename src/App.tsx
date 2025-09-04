import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import styled from "@emotion/styled";
import { ChefHat, Calendar, ShoppingCart, Home } from "lucide-react";
import { RecipeGallery } from "@components/RecipeGallery";
import { MealPlanner } from "@components/MealPlanner";
import { ShoppingList } from "@components/ShoppingList";
import { Dashboard } from "@components/Dashboard";

import { ShoppingListProvider } from "@/contexts/ShoppingListContext";
import { DashboardProvider } from "@/contexts/DashboardContext";
import { MealPlannerProvider } from "@/contexts/MealPlannerContext";
import { RecipeProvider } from "@/contexts/RecipeContext";

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
`;

const Header = styled.header`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const Navigation = styled.nav`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const NavLink = styled(Link)<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: ${(props) =>
    props.$isActive ? "rgba(255, 255, 255, 0.2)" : "transparent"};

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 100px);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

function NavigationBar() {
  const location = useLocation();

  return (
    <Navigation>
      <NavLink to="/" $isActive={location.pathname === "/"}>
        <Home size={20} />
        Dashboard
      </NavLink>
      <NavLink to="/recipes" $isActive={location.pathname === "/recipes"}>
        <ChefHat size={20} />
        Recipes
      </NavLink>
      <NavLink
        to="/meal-planner"
        $isActive={location.pathname === "/meal-planner"}
      >
        <Calendar size={20} />
        Meal Planner
      </NavLink>
      <NavLink
        to="/shopping-list"
        $isActive={location.pathname === "/shopping-list"}
      >
        <ShoppingCart size={20} />
        Shopping List
      </NavLink>
    </Navigation>
  );
}

function App() {
  return (
    <Router>
      <DashboardProvider>
        <MealPlannerProvider>
          <ShoppingListProvider>
            <RecipeProvider>
              <AppContainer>
                <Header>
                  <HeaderContent>
                    <Logo>
                      <ChefHat size={32} />
                      Meal Planner
                    </Logo>
                    <NavigationBar />
                  </HeaderContent>
                </Header>

                <MainContent>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/recipes" element={<RecipeGallery />} />
                    <Route path="/meal-planner" element={<MealPlanner />} />
                    <Route path="/shopping-list" element={<ShoppingList />} />
                  </Routes>
                </MainContent>
              </AppContainer>
            </RecipeProvider>
          </ShoppingListProvider>
        </MealPlannerProvider>
      </DashboardProvider>
    </Router>
  );
}

export default App;
