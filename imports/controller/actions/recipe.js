export const SET_RECIPE_DETAILS = 'SET_RECIPE_DETAILS';

export const setRecipeDetails = recipe => {
  return {
    type: SET_RECIPE_DETAILS,
    recipe: recipe
  }
}