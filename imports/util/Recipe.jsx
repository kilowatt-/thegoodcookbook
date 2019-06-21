class Recipe {

	constructor(recipeName, ingredients, procedure, difficulty, time, foodType, cuisine, imgUrl, recipeID) {
		this.recipeID = recipeID;
		this.recipeName = recipeName;
		this.ingredients = ingredients;
		this.procedure = procedure;
		this.difficulty = difficulty;
		this.time = time;
		this.foodType = foodType;
		this.cuisine = cuisine;
		if (typeof imgURL !== undefined && imgURL !== '')
			this.imgUrl = '';
		else
			this.imgUrl = '';
	}


}

export default Recipe;