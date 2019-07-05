import { Meteor } from 'meteor/meteor';
import Recipes from '/imports/api/recipes';
import Recipe from '../imports/util/Recipe.jsx';
import Ingredient from '../imports/util/Ingredient.jsx';
import {UOM} from '../imports/util/UnitOfMeasurement.jsx';
import {Difficulty} from '../imports/util/Difficulty.jsx';
import {FoodType} from '../imports/util/FoodType.jsx';
import QuantityIngredientMap from '../imports/util/QuantityIngredientMap.jsx'
import { AccountsServer } from 'meteor/accounts-base';

function newMap(qty, ingredient) {
    return new QuantityIngredientMap(qty, ingredient);
}

Meteor.startup(() => {

    Accounts.onCreateUser((options, user) => {
        const emptyFavArray = [];

        user.profile = {
            favourites: emptyFavArray
        }

        return user;
    })


  if (Recipes.find().count() === 0) {

    let tomatoSauce = new Ingredient('Tomato sauce', UOM.TABLESPOON);
    let pasta = new Ingredient('Spaghetti', UOM.OUNCE);
    let mushroom = new Ingredient('Mushroom', UOM.GRAM);
    let chickenStock = new Ingredient('Chicken Stock', UOM.MILLILITRE);

    let spaghetti = new Recipe('Mom\'s Spaghetti', [newMap(1, tomatoSauce), newMap(4, pasta), newMap(5, mushroom), 
        newMap(200, chickenStock)], "blah blah blah", Difficulty.EASY, 30, FoodType.DINNER, "Western");


    Recipes.insert(spaghetti);

    let rice = new Ingredient('Rice', UOM.OUNCE);
    let peas = new Ingredient('Peas', UOM.GRAM);
    let eggs = new Ingredient('Eggs', UOM.PIECES)
    let sausage = new Ingredient('Sausage', UOM.PIECES);

    let friedRice = new Recipe("Dad\'s Fried Rice", [newMap(25,rice),newMap(100,peas),newMap(150,eggs),newMap(5,sausage)], "blah blah blah", Difficulty.EASY, 15, FoodType.DINNER, "Asian");

    Recipes.insert(friedRice);

    let potatoes = new Ingredient('Potatoes', UOM.GRAM);
    let garlicButter = new Ingredient('Garlic Butter', UOM.OUNCE);
    let salt = new Ingredient('Salt', UOM.TEASPOON);

    let mashedPotatoes = new Recipe('Suzy\'s Mashed Potatoes', [newMap(3,potatoes),newMap(50,garlicButter),newMap(30,salt)], "blah blah blah", Difficulty.EASY, 10, FoodType.DINNER, "Western");

    Recipes.insert(mashedPotatoes);

    let muffin = new Ingredient("English Muffin", UOM.PIECES);
    let cheese = new Ingredient("Cheese", UOM.GRAM);
    let ham = new Ingredient("Ham", UOM.GRAM);

    let benedict = new Recipe("Bob's Benedict", [newMap(15,muffin), newMap(10,cheese), newMap(50,ham)], 
        "blah blah blah", Difficulty.HARD, 30, FoodType.BREAKFAST, "Western");

    Recipes.insert(benedict);
  }
});
