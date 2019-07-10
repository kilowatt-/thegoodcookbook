import { TOGGLE_FAVOURITES } from '../actions/favourites.js';

const INITIAL_STATE = {
	selected: false
};

export const favouritesReducer  = (state = INITIAL_STATE, action) => {

	if (action.type === TOGGLE_FAVOURITES) {
		let select = state.selected;
	
		select = !select;
		return {
			...state,
			selected: select
		};
	}
	else
		return state;
}
