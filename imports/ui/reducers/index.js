import { combineReducers } from 'redux';
import { userReducer } from './userReducer.js';
import { favouritesReducer } from './favouritesReducer.js'
import Recipe from '../../util/Recipe'
import {EMPTY_RECIPE} from '../../util/Recipe.jsx'


const recipeDetailsReducer = (recipe = EMPTY_RECIPE, action) => {
	if (action.type === 'SET_RECIPE_DETAILS') {
		return action.recipe;
	} else {
    return recipe;
  }
};

const defaultInputs = {name:'', text: ''}
const inputReducer = (inputs = defaultInputs, action) => {
	if (action.type === "UPDATE_INPUT") {
		const field = action.payload[0];
		const value = action.payload[1];
		return {...inputs, [field]:value};
	}
	return inputs;
};

const reviewReducer = (reviews = [], action) => {
	if (action.type === 'ADD_REVIEW') {
		return [...reviews, action.recipeReview];
	} else {
		return reviews;
	}
};

const recipeDetailedViewReducer = (isOpen = false, action) => {
	if (action.type === 'OPEN_DETAILED_VIEW') {
		return true;
	} else if (action.type === 'CLOSE_DETAILED_VIEW'){
		return false;
	} else {
		return isOpen;
	}
}

const reducers = combineReducers({
	detailedRecipe: recipeDetailsReducer,
	inputReducer: inputReducer,
	reviews: reviewReducer,
	detailedViewOpened: recipeDetailedViewReducer,
	user: userReducer,
	favourites: favouritesReducer
});


export default reducers;
