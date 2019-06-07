import { Meteor } from 'meteor/meteor';
import Recipes from '/imports/api/recipes';
import Recipe from '../imports/util/Recipe.jsx';
import Ingredient from '../imports/util/Ingredient.jsx';
import UOM from '../imports/util/UnitOfMeasurement.jsx';
import Difficulty from '../imports/util/Difficulty.jsx';
import FoodType from '../imports/util/FoodType.jsx'


Meteor.startup(() => {

  if (Recipes.find().count() === 0) {

    let tomatoSauce = new Ingredient('Tomato sauce', UOM.TABLESPOON);
    let pasta = new Ingredient('Spaghetti', UOM.OUNCE);
    let mushroom = new Ingredient('Mushroom', UOM.GRAM);
    let chickenStock = new Ingredient('Chicken Stock', UOM.MILLILITRE);

    let spaghetti = new Recipe('Mom\'s Spaghetti', [tomatoSauce, pasta, mushroom, chickenStock], "blah blah blah", Difficulty.EASY, 30, FoodType.DINNER, "Western");

    insert(spaghetti);

    let rice = new Ingredient('Rice', UOM.OUNCE);
    let peas = new Ingredient('Peas', UOM.GRAM);
    let eggs = new Ingredients('Eggs', UOM.PIECES)
    let sausage = new Ingredients('Sausage', UOM.PIECES);

    let friedRice = new Recipe("Dad\'s Fried Rice", [rice,peas,eggs,sausage], "blah blah blah", Difficulty.EASY, 15, FoodType.DINNER, "Asian");

    insert(friedRice);

    let potatoes = new Ingredient('Potatoes', UOM.GRAM);
    let garlicButter = new Ingredient('Garlic Butter', UOM.OUNCE);
    let salt = new Ingredient('Salt', UOM.TEASPOON);

    let mashedPotatoes = new Recipe('Suzy\'s Mashed Potatoes', [potatoes,garlicButter,salt], "blah blah blah", Difficulty.EASY, 10, FoodType.DINNER, "Western");

    insert(mashedPotatoes);

    let muffin = new Ingredient("English Muffin", UOM.PIECES);
    let cheese = new Ingredient("Cheese", UOM.GRAM);
    let ham = new Ingredient("Ham", UOM.GRAM);

    let benedict = new Recipe("Bob's Benedict", [muffin, cheese, ham], "blah blah blah", Difficulty.HARD, 30, FoodType.BREAKFAST, "Western");

    insert(benedict);
  }
});
