import { SET_RECIPE_DETAILS } from '../actions/recipe.js';
import { EMPTY_RECIPE } from '../../model/Recipe.jsx';

export const recipeDetailsReducer = (recipe = EMPTY_RECIPE, action) => {
	if (action.type === SET_RECIPE_DETAILS) {
		return action.recipe;
	} else {
    return recipe;
  }
};