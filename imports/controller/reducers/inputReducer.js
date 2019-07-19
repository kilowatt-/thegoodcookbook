const DEFAULT_INPUT = {searchType:'Name'}

export const inputReducer = (inputs = DEFAULT_INPUT, action) => {
	if (action.type === "UPDATE_INPUT") {
		const field = action.payload[0];
		const value = action.payload[1];
		return {...inputs, [field]:value};
	} else {
		return inputs;
	}
};
