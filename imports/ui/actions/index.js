import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

export const LOAD_USER = 'LOAD_USER';

export const setRecipeDetails = recipe => {
  return {
    type: 'SET_RECIPE_DETAILS',
    recipe: recipe
  }
}

export const openDetailedView = () => {
  return {
    type: 'OPEN_DETAILED_VIEW'
  }
}

export const closeDetailedView = () => {
  return {
    type: 'CLOSE_DETAILED_VIEW'
  }
}

export const updateInput = val => {
	return { type: 'UPDATE_INPUT', payload: val }
}
