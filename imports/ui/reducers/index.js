import { combineReducers } from 'redux';
import { userReducer } from './userReducer.js';
import { favouritesReducer } from './favouritesReducer.js'

const EMPTY_RECIPE = {
	recipeID: '',
	recipeName: '',
	ingredients: '',
	procedure: '',
	difficulty: '',
	time: '',
	foodType: '',
	cuisine: ''
}

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
	detailedViewOpened: recipeDetailedViewReducer,
	user: userReducer,
	favourites: favouritesReducer
});


export default reducers;
