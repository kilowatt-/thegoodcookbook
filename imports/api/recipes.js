import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export default Recipes = new Mongo.Collection('recipes');

Meteor.methods({
  'recipes.insert'(recipe) {
    Recipes.insert(recipe);
  },
  'recipes.updateAvgRating'(recipeID, newRating) {
    Recipes.update(recipeID, { $set: { avgRating: newRating}});
  },
  'recipes.updateRecipe'(recipeID, newRecipe) {
    Recipes.update(recipeID, newRecipe);
  },
  'recipes.increaseFavouriteCount'(recipeID) {
    Recipes.update(recipeID, {$inc: {'favouriteCount' : 1}});
  },
  'recipes.decreaseFavouriteCount'(recipeID) {
    Recipes.update(recipeID, {$dec: {'favouriteCount': 1}});
  }
});
