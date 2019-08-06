import React from 'react';
import RecipeCards from './components/RecipeCards.jsx';
import Header from './components/Header.jsx';
import SearchFilterBar from "./components/SearchFilterBar";
import HomePage from "./components/HomePage";

const App = () => (

    <div className="wrapper">
        <Header />
        <SearchFilterBar />
        <div id="content">
            <RecipeCards />
            <HomePage />
        </div>

    </div>
);

export default App;
