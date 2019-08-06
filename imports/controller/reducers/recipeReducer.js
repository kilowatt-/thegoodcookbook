import {RECIPE_LOAD_BEGIN, RECIPE_LOAD_ERROR, RECIPE_LOAD_SUCCESS} from "../../controller/actions/recipe";

const INITIAL_LOADING_STATE = {
	loading: false,
	err: null
};

export const loadRecipeReducer = (loading = INITIAL_LOADING_STATE, action) => {
	switch (action.type) {
		case RECIPE_LOAD_BEGIN:
			return {
				...loading,
				loading: true
			};
		case RECIPE_LOAD_SUCCESS:
			return {
				...loading,
				loading: false
			};
		case RECIPE_LOAD_ERROR:
			return {
				...loading,
				loading: true,
				err: action.payload
			};
		default:
			return loading;
	}
};