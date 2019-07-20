import React from 'react';
import RecipeForm from './components/RecipeForm.jsx';
import RecipeCards from './components/RecipeCards.jsx';
import SearchBar from './components/SearchBar.jsx'
import FilterBar from './components/FilterBar.jsx';
import Header from './components/Header.jsx';
import NavBar from './components/NavBar.jsx';
import SearchFilterBar from './components/SearchFilterBar.jsx';

const App = () => (
  <div className="wrapper">
    <Header />
    <SearchFilterBar />
    <div id="content">
      <RecipeCards />
    </div>
  </div>
);

export default App;
