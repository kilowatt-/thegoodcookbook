import { SET_RECIPE_DETAILS } from '../../controller/actions/recipe.js';
import Recipe from '../../model/Recipe.jsx';

export const recipeDetailsReducer = (recipe = Recipe.constructEmptyRecipe(), action) => {
	if (action.type === SET_RECIPE_DETAILS) {
		return action.recipe;
	} else {
    	return recipe;
  }
};