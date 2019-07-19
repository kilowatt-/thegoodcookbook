import { combineReducers } from 'redux';
import { inputReducer } from './inputReducer.js';
import { favouritesReducer } from './favouritesReducer.js';
import { recipeDetailsReducer } from './recipeDetailsReducer.js';
import { recipeDetailedViewReducer } from './recipeDetailedViewReducer.js';
import { userReducer, loginDialogReducer, signupDialogReducer } from './userReducer.js';
import { navBarReducer } from './navBarReducer.js';

const reducers = combineReducers({
	detailedRecipe: recipeDetailsReducer,
	inputReducer: inputReducer,
	detailedViewOpened: recipeDetailedViewReducer,
	user: userReducer,
	favourites: favouritesReducer,
	loginDialogOpened: loginDialogReducer,
	signupDialogOpened: signupDialogReducer,
	navBarReducer: navBarReducer
});

export default reducers;
