import React from 'react';
import RecipeForm from './components/RecipeForm.jsx';
import RecipeCards from './components/RecipeCards.jsx';
import PostRecipeButton from './components/PostRecipeButton.jsx'
import SearchBar from './components/SearchBar.jsx'
import FilterBar from './components/FilterBar.jsx';
import RandomRecipeButton from './components/RandomRecipeButton.jsx';
import FavouritesToggle from './components/FavouritesToggle.jsx';
import Header from './components/Header.jsx'

const App = () => (
  <div className="wrapper">
    <Header />
    <div id="content">
    <SearchBar />
    <FilterBar />
    <PostRecipeButton />
    <RandomRecipeButton />
    <FavouritesToggle />
    <RecipeCards />
    </div>
  </div>
);

export default App;
