
// Gets 5 nearest neighbours. Should be run whenever a recipe is favourited or unfavourited
function findNearestNeighbours(recipe) {
    let cuisine = recipe.cuisine;
    let ingredientMapArray = recipe.ingredients;

    let ingredientArray = ingredientMapArray.map((ingr, index) => {
        ingr.ingredient;
    });

    let recipes = Recipe.find().fetch();

    recipes.forEach(elem => {

    })

}

// Gets a recipe's nearest neighbours
function getNearestNeighbours() {

}