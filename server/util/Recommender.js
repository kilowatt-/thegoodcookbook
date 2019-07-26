import Favourites from '/imports/api/favourites';
import Recipes from "../../imports/api/recipes";
import Heap from 'heap';
import {FoodType} from "../../imports/model/FoodType";

//WEIGHTS
const INGREDIENT_SIMILARITY_WEIGHT = 0.7;
const FOOD_TYPE_WEIGHT = 0.1;
const CUISINE_WEIGHT = 0.2;

//SIMILARITY THRESHOLDS
const TOO_SIMILAR_THRESHOLD = 0.85;
const TOO_DISSIMILAR_THRESHOLD = 0.3;

const LIMIT = 5;

// Gets LIMIT nearest neighbours. Should be run whenever a new recipe is posted.
export function findNearestNeighbours(recipe) {

    let recipes = Recipes.find({_id: {$ne: recipe._id}}).fetch();

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

    let newIngrArray = newIngredients.map((ingrMap) => {
        return ingrMap.ingredient.name;
    });

    let existingIngrArray = existingIngredients.map((ingrMap) => {
        return ingrMap.ingredient.name;
    });


    let newIngrSet = new Set(newIngrArray);
    let existingIngrSet = new Set(existingIngrArray);

    let setToIterate = (newIngrSet.size <= existingIngrSet.size ? newIngrSet : existingIngrSet);
    let otherSet = (setToIterate === newIngrSet ? existingIngrSet : newIngrSet);

    let total = setToIterate.size;
    let similarity = 0;

    for (let ingredient of setToIterate) {
        if (otherSet.has(ingredient))
            similarity++;
    }

    return similarity/total;
}

function rateFoodTypeSimilarity(newFoodType, existingFoodType) {
    const SIMILARITY_BETWEEN_BREAKFAST_AND_LUNCH = 0.4;
    const SIMILARITY_BETWEEN_BREAKFAST_AND_SNACK = 0.7;
    const SIMILARITY_BETWEEN_BREAKFAST_AND_DESSERT = 0.5;

    const SIMILARITY_BETWEEN_LUNCH_AND_DINNER = 0.8;

    const SIMILARITY_BETWEEN_DESSERT_AND_SNACK = 0.7;

    switch (newFoodType) {
        case FoodType.BREAKFAST:
            switch (existingFoodType) {
                case FoodType.BREAKFAST:
                    return 1;
                case FoodType.LUNCH:
                    return SIMILARITY_BETWEEN_BREAKFAST_AND_LUNCH;
                case FoodType.SNACK:
                    return SIMILARITY_BETWEEN_BREAKFAST_AND_SNACK;
                case FoodType.DESSERT:
                    return SIMILARITY_BETWEEN_BREAKFAST_AND_DESSERT;
                default:
                    return 0;
            }
        case FoodType.LUNCH:
            switch (existingFoodType) {
                case FoodType.LUNCH:
                    return 1;
                case FoodType.DINNER:
                    return SIMILARITY_BETWEEN_LUNCH_AND_DINNER;
                default:
                    return 0;
            }
        case FoodType.DINNER:
            switch (existingFoodType) {
                case FoodType.DINNER:
                    return 1;
                case FoodType.LUNCH:
                    return SIMILARITY_BETWEEN_LUNCH_AND_DINNER;
                default:
                    return 0;
            }
        case FoodType.DESSERT:
            switch (existingFoodType) {
                case FoodType.DESSERT:
                    return 1;
                case FoodType.BREAKFAST:
                    return SIMILARITY_BETWEEN_BREAKFAST_AND_DESSERT;
                case FoodType.SNACK:
                    return SIMILARITY_BETWEEN_DESSERT_AND_SNACK;
                default:
                    return 0;
            }

        case FoodType.SNACK:
            switch (existingFoodType) {
                case FoodType.SNACK:
                    return 1;
                case FoodType.BREAKFAST:
                    return SIMILARITY_BETWEEN_BREAKFAST_AND_SNACK;
                case FoodType.DESSERT:
                    return SIMILARITY_BETWEEN_DESSERT_AND_SNACK;
                default:
                    return 0;
            }
        default:
            throw "Unsupported input";
    }
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


export function updateNearestNeighboursForRecipe(newRecipeId, similarityRating, existingRecipeId) {
    let existingRecipe = Recipes.findOne({_id: existingRecipeId});
    let nearestNeighbours = existingRecipe.nearestNeighbours;

    if (nearestNeighbours.length === 0 || similarityRating > nearestNeighbours[nearestNeighbours.length-1].similarity) {

        let insertionIndex = 0;

        for (i = 0; i < nearestNeighbours.length; i++) {

            let currentSimilarity = nearestNeighbours[i].similarity;

            if (similarityRating > currentSimilarity)
                break;
        }

        if (nearestNeighbours.length >= LIMIT)
            nearestNeighbours.pop();

        nearestNeighbours.splice(insertionIndex, 0, newRecipeId);

        Recipes.update({_id: existingRecipeId}, {$set: {nearestNeighbours: nearestNeighbours}});
    }

}

export function getRecommendedForUser() {

    let favourites = Favourites.findOne({_id: Meteor.userId()}).favourites;

    if (favourites.length > 0) {
        let recipes = Recipes.find({_id: {$in: favourites}}).fetch();
        let allRecommendations = [];

        for (i = 0; i < recipes.length; i++) {
            let nearestNeighbours = recipes[i].nearestNeighbours;

            nearestNeighbours.forEach((map) => {
                allRecommendations.push(map.recipeID);
            });
        }

        let recommendedRecipes = (allRecommendations.length > 0 ? Recipes.find({$and: [{_id: {$in: allRecommendations}},{_id: {$nin: favourites}}]})
            .fetch() : Recipes.find({"numRatings": {$gt: 0}}, {limit: 5,
            sort: {"avgRating": -1, "numRatings": -1}}).fetch());

        return recommendedRecipes;

    }
    else {
        return Recipes.find({"numRatings": {$gt: 0}}, {limit: 5,
            sort: {"avgRating": -1, "numRatings": -1}}).fetch();
    }

}