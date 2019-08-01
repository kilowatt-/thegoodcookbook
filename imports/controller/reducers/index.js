import { combineReducers } from 'redux';
import { inputReducer } from './inputReducer.js';
import { favouritesReducer } from './favouritesReducer.js';
import { recipeReducer, loadRecipeReducer } from './recipeReducer.js';
import { recipeDetailedViewReducer } from './recipeDetailedViewReducer.js';
import { userReducer, loginDialogReducer, signupDialogReducer } from './userReducer.js';
import { navBarReducer } from './navBarReducer.js';

const reducers = combineReducers({
	inputReducer: inputReducer,
	detailedViewOpened: recipeDetailedViewReducer,
	user: userReducer,
	favourites: favouritesReducer,
	loginDialogOpened: loginDialogReducer,
	signupDialogOpened: signupDialogReducer,
	currentTab: navBarReducer,
	loadRecipe: loadRecipeReducer
});

export default reducers;
