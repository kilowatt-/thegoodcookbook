import React from 'react';
import RecipeForm from './components/RecipeForm.jsx';
import RecipeCards from './components/RecipeCards.jsx';
import PostRecipeButton from './components/PostRecipeButton.jsx'

const App = () => (
  <div>
    <h1>the good cook book</h1>
    <PostRecipeButton />
    <RecipeCards />
  </div>
);

export default App;
