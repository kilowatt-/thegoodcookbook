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
    <hr></hr>
    <div className="search-filter-bar">
      <SearchBar />
      <FilterBar />
      <RandomRecipeButton />
    </div>
    <div id="content">
      <PostRecipeButton />
      <FavouritesToggle />
      <RecipeCards />
    </div>
  </div>
);

export default App;
