export const setRecipeDetails = recipe => {
  return {
    type: 'SET_RECIPE_DETAILS',
    recipe: recipe
  }
}


export const updateInput = val => {
	return { type: 'UPDATE_INPUT', payload: val }
}