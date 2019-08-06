import {CLOSE_DETAILED_VIEW, OPEN_DETAILED_VIEW} from '../actions/detailedView.js'

export const recipeDetailedViewReducer = (isOpen = false, action) => {
	if (action.type === OPEN_DETAILED_VIEW) {
		return true;
	} else if (action.type === CLOSE_DETAILED_VIEW){
		return false;
	} else {
		return isOpen;
	}
}