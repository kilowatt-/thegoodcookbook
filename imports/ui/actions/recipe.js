export const submitRecipe = (recipe) => {
	return {
		type: 'SUBMIT_RECIPE',
		payload: recipe
	}
}