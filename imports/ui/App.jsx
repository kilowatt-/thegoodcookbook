import React from 'react';
import RecipeForm from './components/RecipeForm.jsx';
import RecipeCards from './components/RecipeCards.jsx';
import PostRecipeButton from './components/PostRecipeButton.jsx';
import SearchBar from './components/SearchBar.jsx';
import RandomRecipeButton from './components/RandomRecipeButton.jsx'

const App = () => (
  <div>
    <h1>the good cook book</h1>
    <SearchBar />
    <PostRecipeButton /> 
    <RandomRecipeButton />
    <RecipeCards />
  </div>
);

export default App;
