import {Meteor} from 'meteor/meteor';
import {Difficulty} from './Difficulty.js'
import {FoodType} from './FoodType.js'
import Ingredient from './Ingredient.js';
import {UOM} from './UnitOfMeasurement.js';
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
			this.imgUrl = 'http://www.mayline.com/products/images/product/noimage.jpg';
		this.createdBy = '';
		this.avgRating = 0;
		this.numRatings = 0;
		this.favouriteCount = 0;
	}

	addCreatedBy() {
		if (Meteor.user()) {
			this.createdBy = Meteor.userId();
		}
	}

	static constructEmptyRecipe() {
		return new Recipe('', [new QuantityIngredientMap(1, new Ingredient('', UOM.CUP))], [''], Difficulty.EASY, 0, FoodType.BREAKFAST, '', '');
	}

}

export default Recipe;
