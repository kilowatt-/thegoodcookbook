import Favourites from '/imports/api/favourites';
import Recipes from "../../imports/api/recipes";
import Heap from 'heap';

const INGREDIENT_SIMILARITY_WEIGHT = 0.6;
const FOOD_TYPE_WEIGHT = 0.2;
const CUISINE_WEIGHT = 0.2;

const TOO_SIMILAR_THRESHOLD = 0.85;
const TOO_DISSIMILAR_THRESHOLD = 0.3;

const LIMIT = 5;

// Gets LIMIT nearest neighbours. Should be run whenever a new recipe is posted.
function findNearestNeighbours(recipe) {

    let recipes = Recipe.find().fetch();

    let similarityHeap= new Heap((m1, m2) => {
        return m2.similarity - m1.similarity;
    });

    let similarityArray = [];

    for (i = 0; i < recipes.length; i++) {
        let map = {
            recipeID: recipes[i]._id,
            similarity: rateSimilarity(recipe, recipes[i])
        };

        if (map.similarity >= TOO_DISSIMILAR_THRESHOLD && map.similarity <= TOO_SIMILAR_THRESHOLD) {
            similarityHeap.push(map);
        }
    }

    for (i = 0; i < LIMIT; i++) {
        if (similarityHeap.empty())
            break;
        else {
            similarityArray.push(similarityHeap.pop());
        }
    }

    return similarityArray;
}

function rateIngredientsSimilarity(newIngredients, existingIngredients) {
    return 0;
}

function rateFoodTypeSimilarity(newFoodType, existingFoodType) {
    return 0;
}

function rateSimilarity(newRecipe, existingRecipe) {
    let newIngredients = newRecipe.ingredients;
    let existingIngredients = existingRecipe.ingredients;

    let newFoodType = newRecipe.foodType;
    let existingFoodType = existingRecipe.foodType;

    let newCuisine = newRecipe.cuisine;
    let existingCuisine = existingRecipe.cuisine;

    let ingredientsSimilarity = rateIngredientsSimilarity(newIngredients, existingIngredients) * INGREDIENT_SIMILARITY_WEIGHT;
    let foodTypeSimilarity = rateFoodTypeSimilarity(newFoodType, existingFoodType) * FOOD_TYPE_WEIGHT;
    let cuisineSimilarity = (newCuisine.toLowerCase() === existingCuisine.toLowerCase() ? CUISINE_WEIGHT : 0);

    return ingredientsSimilarity + foodTypeSimilarity + cuisineSimilarity;
}

// Gets a recipe's nearest neighbours
function getNearestNeighbours(recipeId) {

}

export function getRecommendedForUser() {

    let favourites = Favourites.findOne({_id: Meteor.userId()}).favourites;

    if (favourites.length > 0) {
        return []; // stub: randomly pick from each favourite's nearest neighbours
    }
    else {
        return Recipes.find({"numRatings": {$gt: 0}}, {limit: 5,
            sort: {"avgRating": -1, "numRatings": -1}}).fetch();
    }

}