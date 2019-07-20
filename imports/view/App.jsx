import React from 'react';
import RecipeCards from './components/RecipeCards.jsx';
import Header from './components/Header.jsx';
import SearchFilterBar from "./components/SearchFilterBar";
import RecommendedCards from "./components/RecommendedCards";



const App = () => (
    <div className="wrapper">
        <Header />
        <SearchFilterBar />
        <div id="content">
            <RecipeCards />
            <RecommendedCards />
        </div>
    </div>
);

export default App;
