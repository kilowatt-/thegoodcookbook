import { Meteor } from 'meteor/meteor';
import Favourites from '/imports/api/favourites';
import Recipes from '/imports/api/recipes';
import Reviews from '/imports/api/reviews';
import Recipe from '../imports/model/Recipe.jsx';
import Ingredient from '../imports/model/Ingredient.jsx';
import {UOM} from '../imports/model/UnitOfMeasurement.jsx';
import {Difficulty} from '../imports/model/Difficulty.jsx';
import {FoodType} from '../imports/model/FoodType.jsx';
import QuantityIngredientMap from '../imports/model/QuantityIngredientMap.jsx'
import { AccountsServer } from 'meteor/accounts-base';
import publish from './publish'

function newMap(qty, ingredient) {
    return new QuantityIngredientMap(qty, ingredient);
}

Meteor.startup(() => {

  publish();

  Accounts.onCreateUser((options, user) => {

      let favList = {
          _id: user._id,
          favourites: []
      }

      Favourites.insert(favList);

      user['name'] = options.name;

        return user;
      })

  if(Reviews.find().count() === 0) {
    Reviews.insert({});
  }

  if (Recipes.find().count() === 0) {

    let tomatoSauce = new Ingredient('Tomato sauce', UOM.TABLESPOON);
    let pasta = new Ingredient('Spaghetti', UOM.OUNCE);
    let mushroom = new Ingredient('Mushroom', UOM.GRAM);
    let chickenStock = new Ingredient('Chicken Stock', UOM.MILLILITRE);

    let spaghetti = new Recipe('Mom\'s Spaghetti', [newMap(1, tomatoSauce), newMap(4, pasta), newMap(5, mushroom),
        newMap(200, chickenStock)], ["blah blah blah"], Difficulty.EASY, 30, FoodType.DINNER, "Western", "https://upload.wikimedia.org/wikipedia/commons/7/7c/Spaghetti_and_meatballs_1.jpg");


    Recipes.insert(spaghetti);

    let rice = new Ingredient('Rice', UOM.OUNCE);
    let peas = new Ingredient('Peas', UOM.GRAM);
    let eggs = new Ingredient('Eggs', UOM.PIECES)
    let sausage = new Ingredient('Sausage', UOM.PIECES);

    let friedRice = new Recipe("Dad\'s Fried Rice", [newMap(25,rice),newMap(100,peas),newMap(150,eggs),newMap(5,sausage)],
    "blah blah blah", Difficulty.EASY, 15, FoodType.DINNER, "Asian", "https://www.evolvingtable.com/wp-content/uploads/2016/04/Chicken-Fried-Rice-4.jpg");

    Recipes.insert(friedRice);

    let potatoes = new Ingredient('Potatoes', UOM.GRAM);
    let garlicButter = new Ingredient('Garlic Butter', UOM.OUNCE);
    let salt = new Ingredient('Salt', UOM.TEASPOON);

    let mashedPotatoes = new Recipe('Suzy\'s Mashed Potatoes', [newMap(3,potatoes),newMap(50,garlicButter),newMap(30,salt)],
    ["blah blah blah"], Difficulty.EASY, 10, FoodType.DINNER, "Western", "https://media4.s-nbcnews.com/j/newscms/2018_46/1387085/mashed-potatoes-stock-today-main-181117_509c77e441e8d664744d7bbb5882ecdf.fit-760w.jpg");

    Recipes.insert(mashedPotatoes);

    let muffin = new Ingredient("English Muffin", UOM.PIECES);
    let cheese = new Ingredient("Cheese", UOM.GRAM);
    let ham = new Ingredient("Ham", UOM.GRAM);

    let benedict = new Recipe("Bob's Benedict", [newMap(15,muffin), newMap(10,cheese), newMap(50,ham)],
        ["blah blah blah"], Difficulty.HARD, 30, FoodType.BREAKFAST, "Western", "https://hips.hearstapps.com/hmg-prod/images/190319-eggs-benedict-horizontal-071-1553030422.jpg");

    Recipes.insert(benedict);
  }
});
