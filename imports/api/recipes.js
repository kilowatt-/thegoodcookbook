import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export default Recipes = new Mongo.Collection('recipes');

Meteor.methods({
  'recipes.insert'(recipe) {
    let currDate = new Date();
    recipe.dateAdded = Date.parse(currDate);
    Recipes.insert(recipe, (err, id) => {
      if (err) {
        throw err;
      }

        Meteor.call('findNearestNeighbours', recipe);
    });
  },
  'recipes.updateAvgRating'(recipeID, newRating) {
    Recipes.update(recipeID, { $set: { avgRating: newRating}});
  },
  'recipes.updateNumRatings'(recipeID, newNum) {
    Recipes.update(recipeID, { $set: { numRatings: newNum}});
  },
  'recipes.updateRecipe'(recipeID, newRecipe) {
    Recipes.update(recipeID, {$set: newRecipe}, (err) => {
      if (err) {
        throw err;
      }
      Meteor.call('findNearestNeighbours', newRecipe);
    });
  },
  'recipes.increaseFavouriteCount'(recipeID) {
    Recipes.update(recipeID, {$inc: {'favouriteCount' : 1}});
  },
  'recipes.decreaseFavouriteCount'(recipeID) {
    Recipes.update(recipeID, {$inc: {'favouriteCount': -1}});
  },
  async 'recipes.getRecipes'(filter, addFields, sort, limit) {
    return await Recipes.rawCollection().aggregate(
      [
        {$match: filter},
        addFields,
        sort
      ].filter(x => x != null)
      ).limit(limit || 5).toArray();
  }
});
