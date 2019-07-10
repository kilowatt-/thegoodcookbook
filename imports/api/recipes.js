import { Mongo } from 'meteor/mongo';
import { Metoer } from 'meteor/meteor';
import { check } from 'meteor/check';

export default Recipes = new Mongo.Collection('recipes');

Meteor.methods({
  'recipes.insert'(recipe) {
    Recipes.insert(review);
  },
  'recipes.updateAvgRating'(recipeID, newRating) {
    Recipes.update(recipeID, { $set: { avgRating: newRating}});
  },
  'recipes.updateRecipe'(recipeID, newRecipe) {
    Recipes.update(recipeID, newRecipe);
  }
})
