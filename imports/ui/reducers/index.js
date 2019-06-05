import { combineReducers } from 'redux';

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
const recipeDetailsReducer = (recipe: {}, action) => {
	if (action.type === 'SET_RECIPE_DETAILS') {
		return action.recipe;
	} else {
    return EMPTY_RECIPE;
  }
};

const reducers = combineReducers({
  detailedRecipe: recipeDetailsReducer
});

export default reducers;
