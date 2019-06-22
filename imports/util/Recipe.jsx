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
		if (typeof imgUrl !== undefined && imgUrl !== '')
			this.imgUrl = imgUrl;
		else
			this.imgUrl = '';
	}


}

export default Recipe;