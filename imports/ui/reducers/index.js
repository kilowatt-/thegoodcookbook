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

const defaultInputs = {name:'', text: ''}
const inputReducer = (inputs = defaultInputs, action) => {
	if (action.type === "UPDATE_INPUT") {
		const field = action.payload[0];
		const value = action.payload[1];
		return {...inputs, [field]:value};
	}
	return inputs;
};


const reducers = combineReducers({
	detailedRecipe: recipeDetailsReducer,
	inputReducer: inputReducer
});


export default reducers;
