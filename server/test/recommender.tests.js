import assert from "assert";
import {resetDatabase} from "meteor/xolvio:cleaner";
import Recipe from "../../imports/model/Recipe";
import Ingredient from "../../imports/model/Ingredient";
import {UOM} from "../../imports/model/UnitOfMeasurement";
import {Difficulty} from "../../imports/model/Difficulty";
import {FoodType} from "../../imports/model/FoodType";
import {newMap} from "../main";
import {findNearestNeighbours} from "../util/recommender";

const TESTING_MODE = process.env.TESTING_MODE;

let benedict, benedict2, benedict3, bird, benedict4;

function initializeRecipes() {
    let muffin = new Ingredient("English Muffin", UOM.PIECES);
    let cheese = new Ingredient("Cheese", UOM.GRAM);
    let ham = new Ingredient("Ham", UOM.GRAM);
    let eggs = new Ingredient("eggs", UOM.GRAM);
    let testIngredient1 = new Ingredient("test ingredient 1", UOM.DASH);
    let testIngredient2 = new Ingredient("koel", UOM.PIECES);

    benedict = new Recipe("Bob's Benedict", [newMap(15, muffin), newMap(10, cheese), newMap(50, ham)],
        ["blah blah blah"], Difficulty.HARD, 30, FoodType.BREAKFAST, "Western", "https://hips.hearstapps.com/hmg-prod/images/190319-eggs-benedict-horizontal-071-1553030422.jpg");
    benedict2 = new Recipe("Benedict 2", [newMap(15, muffin), newMap(10, cheese), newMap(50, ham)],
        ["blah blah blah"], Difficulty.HARD, 30, FoodType.BREAKFAST, "Western", "https://hips.hearstapps.com/hmg-prod/images/190319-eggs-benedict-horizontal-071-1553030422.jpg");

    benedict3 = new Recipe("Benedict 3", [newMap(15, muffin), newMap(10, eggs)],
        ["blah blah blah"], Difficulty.HARD, 30, FoodType.SNACK, "Western", "https://hips.hearstapps.com/hmg-prod/images/190319-eggs-benedict-horizontal-071-1553030422.jpg");

    benedict4 = new Recipe("Benedict 4", [newMap(10, ham), newMap(12, testIngredient2)],
        ["blah blah blah"], Difficulty.HARD, 30, FoodType.BREAKFAST, "Western", "https://hips.hearstapps.com/hmg-prod/images/190319-eggs-benedict-horizontal-071-1553030422.jpg");


    bird = new Recipe("Koel", [newMap(10, testIngredient1), newMap(50, testIngredient2), newMap(40, ham)], ["bleh bleh bleh"], Difficulty.EASY, 50, FoodType.DINNER, "Japanese", "");

}

describe("Recommender tests", function () {
    beforeEach(function () {
        if (TESTING_MODE === "1") {
            resetDatabase();
            initializeRecipes();
        } else {
            throw "Application is not in testing mode.";
        }
    });

    it("adding just one recipe to the database should result in an empty nearest neighbours", function () {
        Recipes.insert(benedict);

        assert(Array.isArray(findNearestNeighbours(benedict)), "findNearestNeighbours is an array");
        assert.deepEqual(findNearestNeighbours(benedict), [], "no nearest neighbours");
    });

    it("adding two exactly the same recipes should not result in them being nearest neighbours to each other", function () {
        Recipes.insert(benedict);
        Recipes.insert(benedict2);

        let recipes = Recipes.find().fetch();

        assert.equal(recipes.length, 2, "two recipes in database");

        findNearestNeighbours(recipes[0]);
        findNearestNeighbours(recipes[1]);

        recipes = Recipes.find().fetch();

        assert.deepEqual(recipes[0].nearestNeighbours, [], "no nearest neighbours");
        assert.deepEqual(recipes[1].nearestNeighbours, [], "no nearest neighbours");
    });

    it("adding two completely different recipes should not result in them being nearest neighbours to each other", function () {


        Recipes.insert(bird);
        Recipes.insert(benedict);

        let recipes = Recipes.find().fetch();
        assert.equal(recipes.length, 2, "two recipes in database");

        findNearestNeighbours(recipes[0]);
        findNearestNeighbours(recipes[1]);

        recipes = Recipes.find().fetch();

        assert.deepEqual(recipes[0].nearestNeighbours, [], "no nearest neighbours for bird");
        assert.deepEqual(recipes[1].nearestNeighbours, [], "no nearest neighbours for benedict");
    });

    it("adding somewhat similar recipes should result in them being nearest neighbours to each other", function () {
        let benedict1Id = Recipes.insert(benedict);
        let benedict2Id = Recipes.insert(benedict3);

        let recipes = Recipes.find().fetch();

        assert.equal(recipes.length, 2, "two recipes in database");

        findNearestNeighbours(recipes[0]);
        findNearestNeighbours(recipes[1]);

        recipes = Recipes.find().fetch();

        let nnBenedict1 = recipes[0].nearestNeighbours;
        let nnBenedict2 = recipes[1].nearestNeighbours;

        assert.equal(nnBenedict1.length, 1);
        assert.equal(nnBenedict2.length, 1);

        assert.equal(nnBenedict1[0].recipeID, benedict2Id);
        assert.equal(nnBenedict2[0].recipeID, benedict1Id);

        assert.equal(nnBenedict1[0].similarity, nnBenedict2[0].similarity);
    });

    it("updating recipes updates the similarity on both ends", function () {
        let benedict1Id = Recipes.insert(benedict);
        let benedict2Id = Recipes.insert(benedict3);

        let recipes = Recipes.find().fetch();

        assert.equal(recipes.length, 2, "two recipes in database");

        findNearestNeighbours(recipes[0]);
        findNearestNeighbours(recipes[1]);

        recipes = Recipes.find().fetch();


        let initialSimilarity1 = recipes[0].nearestNeighbours;
        let initialSimilarity2 = recipes[1].nearestNeighbours;

        assert.equal(initialSimilarity1[0].similarity, initialSimilarity2[0].similarity);

        benedict3.foodType = FoodType.BREAKFAST;

        Recipes.update({_id: benedict2Id}, {$set: benedict3});

        let ben1 = Recipes.findOne({_id: benedict2Id});

        findNearestNeighbours(ben1);

        recipes = Recipes.find().fetch();

        let updatedSimilarity1 = recipes[0].nearestNeighbours;
        let updatedSimilarity2 = recipes[1].nearestNeighbours;

        assert.notDeepEqual(updatedSimilarity1, initialSimilarity1);
        assert.notDeepEqual(updatedSimilarity2, initialSimilarity2);
        assert.equal(updatedSimilarity1[0].similarity, updatedSimilarity2[0].similarity);
        assert.equal(updatedSimilarity1[0].recipeID, benedict2Id);
        assert.equal(updatedSimilarity2[0].recipeID, benedict1Id);
    });

    it("updating recipe so that they are so dissimilar removes similarity rating on both ends", function () {
        // noinspection JSUnusedLocalSymbols
        let benedict1Id = Recipes.insert(benedict);
        let benedict2Id = Recipes.insert(benedict3);

        let recipes = Recipes.find().fetch();

        assert.equal(recipes.length, 2, "two recipes in database");

        findNearestNeighbours(recipes[0]);
        findNearestNeighbours(recipes[1]);

        recipes = Recipes.find().fetch();

        let initialSimilarity1 = recipes[0].nearestNeighbours;
        let initialSimilarity2 = recipes[1].nearestNeighbours;

        assert.equal(initialSimilarity1[0].similarity, initialSimilarity2[0].similarity);

        Recipes.update({_id: benedict2Id}, {$set: bird});

        let ben1 = Recipes.findOne({_id: benedict2Id});

        findNearestNeighbours(ben1);

        recipes = Recipes.find().fetch();

        let updatedSimilarity1 = recipes[0].nearestNeighbours;
        let updatedSimilarity2 = recipes[1].nearestNeighbours;

        assert.equal(updatedSimilarity1.length, 0);
        assert.equal(updatedSimilarity2.length, 0);

        assert.notDeepEqual(updatedSimilarity1, initialSimilarity1);
        assert.notDeepEqual(updatedSimilarity2, initialSimilarity2);
    });

    it("adding dissimilar recipe does not update other recipes' nearest neighbour", function() {
        let benedict1Id = Recipes.insert(benedict);

        let recipes = Recipes.find().fetch();

        findNearestNeighbours(recipes[0]);

        let benedict1Recipe = Recipes.findOne({_id: benedict1Id});

        let nn1 = benedict1Recipe.nearestNeighbours;

        assert.equal(nn1.length, 0, "no nearest neighbours for B1");

        let birdId = Recipes.insert(bird);

        recipes = Recipes.find().fetch();

        assert.equal(recipes.length, 2, "two recipes in database");

        findNearestNeighbours(recipes[1]);

        let benedict2Recipe = Recipes.findOne({_id: birdId});
        let nn2 = benedict2Recipe.nearestNeighbours;

        assert.equal(nn2.length, 0, "no nearest neighbours for B2");

        benedict1Recipe = Recipes.findOne({_id: benedict1Id});

        nn1 = benedict1Recipe.nearestNeighbours;

        assert.equal(nn1.length, 0, "no nearest neighbours for B1 after adding B2.");

    });

});