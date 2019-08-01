import { RECIPE_LOAD_SUCCESS, RECIPE_LOAD_BEGIN, RECIPE_LOAD_ERROR} from "../../controller/actions/recipe";


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