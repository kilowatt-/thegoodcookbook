import Favourites from "/imports/api/favourites";
import Recipes from "../../imports/api/recipes";
import Heap from "heap";
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

    let similarityHeap = new Heap((m1, m2) => {
        return m2.similarity - m1.similarity;
    });

    let similarityArray = [];

    recipes.forEach((elem) => {
        let map = {
            recipeID: elem._id,
            similarity: rateSimilarity(recipe, elem)
        };

        updateNearestNeighboursForRecipe(recipe._id, map.similarity, map.recipeID);

        if (map.similarity >= TOO_DISSIMILAR_THRESHOLD && map.similarity <= TOO_SIMILAR_THRESHOLD) {
            similarityHeap.push(map);
        }
    });

    for (i = 0; i < LIMIT; i++) {
        if (similarityHeap.empty())
            break;
        else {
            similarityArray.push(similarityHeap.pop());
        }
    }

    Recipes.update({_id: recipe._id}, {$set: {nearestNeighbours: similarityArray}});

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

    let matchPercentage = similarity / total;

    if (otherSet.size === total)
        return matchPercentage;
    else {
        let unmatchedPercentage = (otherSet.size - similarity) / otherSet.size;

        let otherMatch = 1 - unmatchedPercentage;
        // Do some weighting if the other set's size is more than two times the smaller set's size

        if (otherSet.size > (setToIterate.size * 2)) {
            const MATCH_PERCENTAGE_WEIGHT = 0.5;

            return matchPercentage * MATCH_PERCENTAGE_WEIGHT + otherMatch * (1 - MATCH_PERCENTAGE_WEIGHT);
        }

        return otherMatch;

    }
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


function updateNearestNeighboursForRecipe(newRecipeId, similarityRating, existingRecipeId) {

    let existingRecipe = Recipes.findOne({_id: existingRecipeId});
    let nearestNeighbours = existingRecipe.nearestNeighbours;

    if (!nearestNeighbours)
        nearestNeighbours = [];

    let indexInNN = nearestNeighbours.findIndex((elem) => {
        return elem.recipeID === newRecipeId;
    });

    let recipeMap = {
        recipeID: newRecipeId,
        similarity: similarityRating
    };

    if (indexInNN === -1 && (nearestNeighbours.length === 0 ||
        similarityRating > nearestNeighbours[nearestNeighbours.length - 1].similarity)) {

        if (similarityRating >= TOO_DISSIMILAR_THRESHOLD && similarityRating <= TOO_SIMILAR_THRESHOLD) {
            let insertionIndex = 0;

            for (i = 0; i < nearestNeighbours.length; i++) {

                let currentSimilarity = nearestNeighbours[i].similarity;

                if (similarityRating >= currentSimilarity)
                    break;
            }

            if (nearestNeighbours.length >= LIMIT)
                nearestNeighbours.pop();

            nearestNeighbours.splice(insertionIndex, 0, recipeMap);
        }
    } else if (indexInNN > -1 && nearestNeighbours[indexInNN].similarity !== similarityRating) {
        nearestNeighbours.splice(indexInNN, 1);

        if (similarityRating >= TOO_DISSIMILAR_THRESHOLD && similarityRating <= TOO_SIMILAR_THRESHOLD) {

            let partitionIndex = nearestNeighbours.findIndex((elem) => {
                    return elem.similarity <= similarityRating;
                }
            );

            if (partitionIndex === -1)
                nearestNeighbours.push(recipeMap);
            else
                nearestNeighbours.splice(partitionIndex, 1, recipeMap);
        }
    }

    Recipes.update({_id: existingRecipeId}, {$set: {nearestNeighbours: nearestNeighbours}});

}

export function getRecommendedForUser() {

    let favourites = Favourites.findOne({_id: Meteor.userId()}).favourites;

    if (favourites.length > 0) {
        let recipes = Recipes.find({_id: {$in: favourites}}).fetch();
        let allRecommendations = new Set();

        for (i = 0; i < recipes.length; i++) {
            let nearestNeighbours = recipes[i].nearestNeighbours;

            nearestNeighbours.forEach((map) => {
                if (!favourites.includes(map.recipeID))
                    allRecommendations.add(map.recipeID);
            });
        }

        let allRecommendationsArray = Array.from(allRecommendations);
        let randomizedRecommendations = [];

        if (allRecommendationsArray.length > LIMIT) {

            for (let i = 0; i < LIMIT; i++) {
                if (allRecommendationsArray.length === 0)
                    break;

                let random = Math.floor(Math.random() * allRecommendationsArray.length);

                randomizedRecommendations.push(allRecommendationsArray.splice(random, 1)[0]);
            }
        } else
            randomizedRecommendations = allRecommendationsArray;


        return (allRecommendations.size > 0 ? Recipes.find({$and: [{_id: {$in: randomizedRecommendations}}, {_id: {$nin: favourites}}]})
            .fetch() : Recipes.find({"numRatings": {$gt: 0}}, {
            limit: LIMIT,
            sort: {"avgRating": -1, "numRatings": -1}
        }).fetch());

    } else {
        return Recipes.find({"numRatings": {$gt: 0}}, {
            limit: LIMIT,
            sort: {"avgRating": -1, "numRatings": -1}
        }).fetch();
    }

}