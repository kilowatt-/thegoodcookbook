import {Meteor} from 'meteor/meteor';
import {Difficulty} from './Difficulty.jsx'
import {FoodType} from './FoodType.jsx'
import Ingredient from './Ingredient.jsx';
import {UOM} from './UnitOfMeasurement.jsx';
import QuantityIngredientMap from './QuantityIngredientMap'

class Recipe {

	constructor(recipeName, ingredients, procedure, difficulty, time, foodType, cuisine, imgUrl) {
		this.recipeName = recipeName;
		this.ingredients = ingredients;
		this.procedure = procedure;
		this.difficulty = difficulty;
		this.time = time;
		this.foodType = foodType;
		this.cuisine = cuisine;
		if (typeof imgUrl !== undefined && imgUrl !== '')
			this.imgUrl = imgUrl;
		else
			this.imgUrl = '';
		this.createdBy = '';
	}

	addCreatedBy() {
		if (Meteor.user()) {
			this.createdBy = Meteor.userId();
		}
	}

}

export const EMPTY_RECIPE = new Recipe('', [new QuantityIngredientMap(1, new Ingredient('', UOM.CUP))], '', Difficulty.EASY, 0, FoodType.BREAKFAST, '', '');

export default Recipe;