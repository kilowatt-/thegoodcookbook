import { SET_RECIPE_DETAILS } from '../../controller/actions/recipe.js';
import { RECIPE_LOAD_SUCCESS, RECIPE_LOAD_BEGIN, RECIPE_LOAD_ERROR} from "../../controller/actions/recipe";
import Recipe from '../../model/Recipe.js';

const INITIAL_LOADING_STATE = {
	loading: false,
	err: null
};

export const recipeReducer = (recipe = Recipe.constructEmptyRecipe(), action) => {
	if (action.type === SET_RECIPE_DETAILS) {
		return action.recipe;
	} else {
    	return recipe;
  }
};

export const loadRecipeReducer = (loading = INITIAL_LOADING_STATE, action) => {
	switch (action.type) {
		case RECIPE_LOAD_BEGIN:
			return {
				...loading,
				loading: true
			};
			break;
		case RECIPE_LOAD_SUCCESS:
			return {
				...loading,
				loading: false
			};
			break;
		case RECIPE_LOAD_ERROR:
			return {
				...loading,
				loading: true,
				err: action.payload
			};
			break;
		default:
			return loading;
	}
};