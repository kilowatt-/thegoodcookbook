import {BROWSE_ADDED, BROWSE_ALL, BROWSE_FAVORITES, HOME} from "../actions/navBar.js";

const DEFAULT_INPUT = {searchType: "Name"};

export const inputReducer = (inputs = DEFAULT_INPUT, action) => {
    if (action.type === HOME || action.type ===BROWSE_ALL || action.type === BROWSE_ADDED || action.type === BROWSE_FAVORITES ) {
        return {...inputs, chipSearch: [], searchBar: "" , recipeType: "",selectedDifficulty: "", selectedTiming:"", searchType:"Name"};
	}else if (action.type === "UPDATE_INPUT") {
        const field = action.payload[0];
        const value = action.payload[1];
        return {...inputs, [field]: value};
    } else {
        return inputs;
    }
};
