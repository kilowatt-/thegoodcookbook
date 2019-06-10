class Recipe {

	constructor(recipeName, ingredients, procedure, difficulty, time, foodType, cuisine) {
		this.recipeName = recipeName;
		this.ingredients = ingredients;
		this.procedure = procedure;
		this.difficulty = difficulty;
		this.time = time;
		this.foodType = foodType;
		this.cuisine = cuisine;
		this.imgUrl = '';
	}


}

export default Recipe;