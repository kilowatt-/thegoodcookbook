import { Mongo } from 'meteor/mongo';

export default Recipes = new Mongo.Collection('recipes');

Meteor.methods({
	'recipes.insert'(recipe) {
		Recipes.insert(recipe);
	}
})