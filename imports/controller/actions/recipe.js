export const RECIPE_LOAD_BEGIN = 'RECIPE_LOAD_BEGIN';
export const RECIPE_LOAD_SUCCESS = 'RECIPE_LOAD_SUCCESS';
export const RECIPE_LOAD_ERROR = 'RECIPE_LOAD_ERROR';


export const recipeLoadBegin = () => {
  return {
    type:RECIPE_LOAD_BEGIN
  }
};

export const recipeLoadSuccess = () => {
  return {
    type: RECIPE_LOAD_SUCCESS
  }
};

export const recipeLoadError = err => {
  return {
    type: RECIPE_LOAD_ERROR,
    payload: err
  }
};