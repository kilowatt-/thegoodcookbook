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

const testReviews = [
	{recipeID: 1, name: "test", rating: 4, review: "blah blah blah"},
	{recipeID: 1, name: "test", rating: 4, review: "blah blah blah"},
	{recipeID: 3, name: "xxx", rating: 3, review: "testing 1234fjkldaf"},
	{recipeID: 1, name: "test", rating: 4, review: "blah blah blah"}
]
const reviewReducer = (reviews = testReviews, action) => {
	if (action.type === 'ADD_REVIEW') {
		return [...reviews, action.recipeReview];
	} else {
		return reviews;
	}
}

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
	detailedViewOpened: recipeDetailedViewReducer
});


export default reducers;
