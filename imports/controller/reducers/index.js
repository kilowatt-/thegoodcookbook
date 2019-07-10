import { combineReducers } from 'redux';
import { inputReducer } from './inputReducer.js';
import { favouritesReducer } from './favouritesReducer.js';
import { recipeDetailsReducer } from './recipeDetailsReducer.js';
import { recipeDetailedViewReducer } from './recipeDetailedViewReducer.js';
import { userReducer } from './userReducer.js';

const reducers = combineReducers({
	detailedRecipe: recipeDetailsReducer,
	inputReducer: inputReducer,
	detailedViewOpened: recipeDetailedViewReducer,
	user: userReducer,
	favourites: favouritesReducer
});


export default reducers;
