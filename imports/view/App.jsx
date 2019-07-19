import React from 'react';
import RecipeCards from './components/RecipeCards.jsx';
import SearchBar from './components/SearchBar.jsx'
import FilterBar from './components/FilterBar.jsx';

import Header from './components/Header.jsx';
import NavBar from './components/NavBar.jsx';


const App = () => (
  <div className="wrapper">
    <Header />
    <NavBar />
    <div id="content">
    <SearchBar />
    <FilterBar />
    <PostRecipeButton />
    <RandomRecipeButton />
    <FavouritesToggle />
    <RecipeCards />
    <RecommendedCards />

    </div>
  </div>
);

export default App;
