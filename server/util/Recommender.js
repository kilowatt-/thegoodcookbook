import Favourites from '/imports/api/favourites';
import Recipes from "../../imports/api/recipes";

// Gets 5 nearest neighbours. Should be run whenever a new recipe is posted.
function findNearestNeighbours(recipe) {
    let cuisine = recipe.cuisine;
    let ingredientMapArray = recipe.ingredients;

    let ingredientArray = ingredientMapArray.map((ingr, index) => {
        ingr.ingredient;
    });

    let recipes = Recipe.find().fetch();

}

// Gets a recipe's nearest neighbours
function getNearestNeighbours(recipe) {

}

export function getRecommendedForUser() {

    let favourites = Favourites.findOne({_id: Meteor.userId()}).favourites;

    if (favourites.length > 0) {
        return {}; // stub: randomly pick from each favourite's nearest neighbours
    }
    else {
        return Recipes.find({"numRatings": {$gt: 0}}, {limit: 5,
            sort: {"avgRating": -1, "numRatings": -1}}).fetch();
    }

}