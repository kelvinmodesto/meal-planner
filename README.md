# 🍽️ Meal Planner Dashboard

A comprehensive meal planning application built with React, TypeScript, and CSS-in-JS that helps you organize recipes, plan weekly meals, and generate shopping lists.

## ✨ Features

### 🏠 Dashboard
- **Overview Statistics**: Track total recipes, planned meals, shopping items, and average cook times
- **Quick Actions**: Fast navigation to main features
- **Recent Activity**: View your latest meal planning activities
- **Responsive Design**: Beautiful glassmorphism UI that works on all devices

### 🍳 Recipe Gallery
- **Recipe Collection**: Browse through a curated collection of recipes
- **Advanced Filtering**: Filter by cuisine type, dietary restrictions, and cooking time
- **Search Functionality**: Find recipes by name or description
- **Sorting Options**: Sort by rating, cook time, or alphabetically
- **Recipe Details**: View detailed recipe information in an elegant modal
- **Interactive Cards**: Hover effects and smooth animations

### 📅 Weekly Meal Planner
- **7-Day Calendar**: Plan breakfast, lunch, and dinner for each day of the week
- **Week Navigation**: Easily navigate between different weeks
- **Drag & Drop Interface**: Simple meal assignment with click-to-add functionality
- **Quick Add Meals**: Pre-defined meal options for fast planning
- **Meal Management**: Add and remove meals with intuitive controls
- **Visual Organization**: Color-coded meal types for easy identification

### 🛒 Enhanced Smart Shopping List with Context API
- **Context API State Management**: Centralized state management using React Context and useReducer
- **Mocked Ingredients Database**: 40+ pre-loaded ingredients across 8 categories with realistic pricing
- **Advanced Categorization**: 8 categories including Produce, Meat & Fish, Dairy, Bakery, Pantry, Frozen, Beverages, and Snacks
- **Interactive Ingredients Gallery**: Browse and add ingredients from a searchable, filterable catalog
- **Comprehensive Cost Tracking**: Monitor total costs, completed items, and remaining expenses with real-time updates
- **Quantity Management**: Track quantities and units (lbs, pieces, gallons, etc.) for each item
- **Interactive Management**: Mark items as completed, edit in-place, and delete with smooth animations
- **Per-Category Input**: Dedicated input fields for each category with independent state management
- **Auto-Generation**: Generate realistic shopping lists from meal plans with sample items
- **Bulk Actions**: Clear completed items or clear all items with confirmation
- **Visual Feedback**: Color-coded categories, hover effects, and empty state messaging
- **Edit Mode**: In-line editing with save/cancel functionality for seamless item management

### 📊 Complete Dashboard with Context API
- **Context API Integration**: Full state management with useReducer for dashboard data
- **Real-time Statistics**: Track recipes, meals, shopping items, and cooking metrics
- **Activity Timeline**: Recent user activities with timestamps and categorized icons
- **Quick Actions**: Direct navigation to main features with visual feedback
- **Responsive Cards**: Hover effects and smooth animations throughout

### 📅 Advanced Meal Planner with Context API
- **Context API Management**: Comprehensive state management for meal planning
- **12+ Predefined Meals**: Curated meals across breakfast, lunch, and dinner with nutritional info
- **Interactive Calendar**: 7-day grid with color-coded meal types and today highlighting
- **Smart Statistics**: Real-time calculation of planned meals, days, calories, and cook times
- **Meal Management**: Add random meals, remove specific meals, and clear entire days/weeks
- **Available Meals Panel**: Browse and filter meals by type, difficulty, and cuisine
- **Quick Actions**: Random meal addition and bulk planning operations
- **Week Navigation**: Navigate between weeks with current week highlighting

### 🍳 Enhanced Recipe Gallery with Context API
- **Context API Architecture**: Full recipe state management with advanced filtering
- **8 Premium Recipes**: Detailed recipes with ingredients, instructions, and nutritional data
- **Advanced Search**: Search by title, description, cuisine, or ingredients
- **Multi-Filter System**: Filter by cuisine, dietary restrictions, cook time with active filter display
- **Smart Sorting**: Sort by rating, cook time, name, or calories with real-time updates
- **Recipe Modal**: Detailed view with nutrition facts, step-by-step instructions, and action buttons
- **Favorites System**: Toggle and manage favorite recipes with persistent state
- **CRUD Operations**: Add, update, and delete recipes with automatic filtering updates

## 🚀 Technology Stack

- **Frontend Framework**: React 19.1.1 with TypeScript
- **Styling**: CSS-in-JS with Emotion/styled
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite 7.1.2 with path mapping support
- **Package Manager**: npm
- **Path Aliases**: Custom @ and @components aliases for cleaner imports
- **Testing Suite**: Comprehensive unit tests with React Testing Library and Vitest
- **Component Architecture**: Modular component structure with separate directories

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd meal-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design Features

### Modern UI/UX
- **Glassmorphism Design**: Beautiful frosted glass effects throughout the app
- **Gradient Backgrounds**: Elegant purple-to-blue gradients
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Responsive Layout**: Mobile-first design that scales beautifully

### Path Mapping Configuration
- **TypeScript Aliases**: Configured `@` for src root and `@components` for components
- **Vite Integration**: Path aliases work seamlessly with Vite dev server and build
- **Import Simplification**: Clean imports like `import Dashboard from "@components/Dashboard"`

### Accessibility
- **Keyboard Navigation**: Full keyboard accessibility support
- **Focus Management**: Clear focus indicators and logical tab order
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Color Contrast**: High contrast ratios for better readability

## 📱 Responsive Design

The application is fully responsive and provides an optimal experience across:
- **Desktop**: Full-featured experience with multi-column layouts
- **Tablet**: Adapted layouts with touch-friendly interactions
- **Mobile**: Single-column layouts optimized for small screens

## 🔧 Component Architecture

```
src/
├── components/
│   ├── Dashboard/             # Dashboard module
│   │   ├── index.tsx          # Barrel exports
│   │   ├── Dashboard.tsx      # Main dashboard component
│   │   ├── DashboardHeader.tsx # Welcome section
│   │   ├── DashboardStats.tsx # Statistics cards
│   │   ├── QuickActions.tsx   # Navigation cards
│   │   ├── RecentActivity.tsx # Activity timeline
│   │   └── __tests__/         # Dashboard tests
│   │       └── Dashboard.test.tsx
│   ├── MealPlanner/           # Meal planner module
│   │   ├── index.tsx          # Barrel exports
│   │   ├── MealPlanner.tsx    # Main meal planner
│   │   ├── MealPlannerHeader.tsx # Header section
│   │   ├── MealPlannerStats.tsx # Statistics display
│   │   ├── WeekNavigation.tsx # Week controls
│   │   ├── CalendarGrid.tsx   # 7-day calendar
│   │   ├── AvailableMeals.tsx # Meals catalog
│   │   └── __tests__/         # Meal planner tests
│   │       └── MealPlanner.test.tsx
│   ├── RecipeGallery/         # Recipe gallery module
│   │   ├── index.tsx          # Barrel exports
│   │   ├── RecipeGallery.tsx  # Main gallery component
│   │   ├── RecipeGalleryHeader.tsx # Header section
│   │   ├── RecipeFilters.tsx  # Advanced filtering
│   │   ├── RecipeGrid.tsx     # Recipe cards grid
│   │   ├── RecipeModal.tsx    # Detailed recipe modal
│   │   └── __tests__/         # Recipe tests
│   │       └── RecipeGallery.test.tsx
│   └── ShoppingList/          # Shopping list module
│       ├── index.tsx          # Barrel exports
│       ├── ShoppingList.tsx   # Main shopping list component
│       ├── ShoppingListHeader.tsx
│       ├── ShoppingListSummary.tsx
│       ├── ShoppingListActions.tsx
│       ├── ShoppingListCategories.tsx
│       ├── AvailableIngredients.tsx
│       └── __tests__/         # Component tests
│           ├── ShoppingList.test.tsx
│           └── AvailableIngredients.test.tsx
├── contexts/
│   ├── DashboardContext.tsx   # Dashboard state management
│   ├── MealPlannerContext.tsx # Meal planning state management
│   ├── RecipeContext.tsx      # Recipe state management
│   ├── ShoppingListContext.tsx # Shopping list state management
│   └── __tests__/
│       ├── DashboardContext.test.tsx
│       ├── MealPlannerContext.test.tsx
│       ├── RecipeContext.test.tsx
│       └── ShoppingListContext.test.tsx
├── types/
│   └── index.ts              # Comprehensive TypeScript definitions
├── App.tsx                   # Main app with routing and context providers
├── main.tsx                  # Application entry point
├── setupTests.ts             # Test configuration
├── index.css                 # Global styles and theme
├── tsconfig.app.json         # App TypeScript config with path mapping
├── tsconfig.node.json        # Node TypeScript config
└── vite.config.ts            # Vite config with alias support and test setup
```

### Path Mapping Setup
```typescript
// tsconfig.app.json & tsconfig.node.json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@": ["./"],
      "@/*": ["./*"],
      "@components": ["./components/*"],
      "@components/*": ["./components/*"]
    }
  }
}

// vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
    },
  },
});
```

## 🧪 Comprehensive Testing Architecture

The application includes extensive unit tests using Vitest and React Testing Library across all modules:

### Test Structure
```
src/
├── contexts/__tests__/
│   ├── DashboardContext.test.tsx       # Dashboard state tests
│   ├── MealPlannerContext.test.tsx     # Meal planning tests
│   ├── RecipeContext.test.tsx          # Recipe management tests
│   └── ShoppingListContext.test.tsx    # Shopping list tests
└── components/
    ├── Dashboard/__tests__/
    │   └── Dashboard.test.tsx          # Dashboard integration tests
    ├── MealPlanner/__tests__/
    │   └── MealPlanner.test.tsx        # Meal planner tests
    ├── RecipeGallery/__tests__/
    │   └── RecipeGallery.test.tsx      # Recipe gallery tests
    └── ShoppingList/__tests__/
        ├── ShoppingList.test.tsx       # Shopping list integration
        └── AvailableIngredients.test.tsx # Ingredients catalog
```

### Test Coverage
- **Context API**: State management, reducers, and provider functionality for all modules
- **Component Integration**: User interactions, data flow, and UI behavior
- **User Workflows**: CRUD operations, filtering, searching, and state updates
- **Error Handling**: Edge cases, validation, and error boundaries
- **Responsive Behavior**: Mobile and desktop interaction patterns

### Running Tests
```bash
npm test                # Run all tests
npm run test:ui         # Run with UI dashboard
npm run test:coverage   # Run with coverage report
```

## 📋 Data Models

### Context API Data Models

#### Recipe Interface
```typescript
interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  cuisine: string;
  cookTime: number;
  servings: number;
  rating: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  dietaryRestrictions: string[];
  ingredients: string[];
  instructions: string[];
  calories: number;
  prepTime: number;
}
```

#### Meal Planning Interface
```typescript
interface Meal {
  id: string;
  name: string;
  cookTime: number;
  servings: number;
  type: 'breakfast' | 'lunch' | 'dinner';
  recipeId?: number;
  calories?: number;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  cuisine?: string;
}

interface WeekPlan {
  [dateKey: string]: {
    breakfast: Meal[];
    lunch: Meal[];
    dinner: Meal[];
  };
}
```

#### Shopping List Interface
```typescript
interface ShoppingListItem {
  id: string;
  name: string;
  category: string;
  price: number;
  completed: boolean;
  quantity: number;
  unit: string;
}
```

#### Dashboard Interface
```typescript
interface DashboardStats {
  totalRecipes: number;
  weeklyMeals: number;
  shoppingItems: number;
  averageCookTime: number;
}

interface Activity {
  id: string;
  title: string;
  time: string;
  type: 'recipe' | 'meal' | 'shopping' | 'rating';
  icon: string;
}
```

### Context API Architecture

Each major feature has its own Context API implementation:

#### Context Providers Structure
```typescript
// App.tsx context nesting
<DashboardProvider>
  <MealPlannerProvider>
    <ShoppingListProvider>
      <RecipeProvider>
        <AppComponents />
      </RecipeProvider>
    </ShoppingListProvider>
  </MealPlannerProvider>
</DashboardProvider>
```

#### State Management Pattern
- **useReducer**: All contexts use useReducer for complex state management
- **Actions**: Type-safe action dispatch for state updates
- **Computed Values**: Derived state calculations (stats, filtered data)
- **Persistence**: Local state with potential for future backend integration

## 🎯 Future Enhancements

### Recipe Gallery Enhancements
- **Recipe Import API**: Import from popular recipe websites and blogs
- **User-Generated Content**: Allow users to create and share their own recipes
- **Recipe Collections**: Curated collections by cuisine, season, or dietary needs
- **Advanced Nutrition Analysis**: Detailed macro/micronutrient breakdowns
- **Recipe Scaling**: Automatic ingredient scaling for different serving sizes
- **Cooking Timer Integration**: Built-in timers for each recipe step

### Meal Planner Improvements
- **Template Library**: Pre-made meal plan templates for different dietary goals
- **Meal Prep Optimization**: Group similar prep tasks across multiple recipes
- **Nutritional Goal Tracking**: Set and track daily/weekly nutrition targets
- **Leftover Management**: Track and suggest uses for leftover ingredients
- **Family Meal Planning**: Multiple user profiles with different preferences
- **Seasonal Menu Suggestions**: Recommend seasonal ingredients and recipes

### Shopping List Enhancements
- **Store Layout Mapping**: Optimize shopping routes based on store layouts
- **Price Comparison**: Compare prices across multiple stores
- **Inventory Management**: Track pantry items and suggest recipes based on availability
- **Smart Notifications**: Reminders for shopping trips and expiring items
- **Barcode Scanning**: Quick item addition and price checking
- **Group Shopping**: Collaborative lists for families and roommates

### Dashboard & Analytics
- **Advanced Analytics**: Detailed insights into cooking habits and preferences
- **Cost Analysis**: Track spending patterns and budget management
- **Cooking Statistics**: Time saved, meals prepared, nutrition goals met
- **Recipe Recommendations**: AI-powered suggestions based on user behavior
- **Seasonal Insights**: Cooking pattern analysis by season

### Technical Improvements
- **Offline Support**: PWA capabilities with offline recipe access
- **Cloud Synchronization**: Real-time sync across devices
- **Performance Optimization**: Virtual scrolling, image optimization, lazy loading
- **Accessibility**: Enhanced screen reader support and keyboard navigation
- **Multi-language Support**: Internationalization for global users

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤖 AI Contribution Acknowledgment

This project includes AI-generated content in the following areas:
- **Background colors and gradients** - Visual styling and color schemes
- **CSS rules and styling** - Responsive design, animations, and layout styles
- **Emojis and icons** - Visual elements and decorative content
- **Text content and copy** - UI labels, descriptions, and messaging
- **Mock data and examples** - Sample recipes, meal plans, and test data
- **Docs** - Examples, tutorials, and documentation
- **Increase testing coverage** - Automated testing and quality assurance

The core application scaffolding, component architecture, state management, and most of the functional code were hand-coded by the developer.

## 👨‍💻 Author

**Kelvin Modesto**

---

**Happy Meal Planning! 🍽️✨**
