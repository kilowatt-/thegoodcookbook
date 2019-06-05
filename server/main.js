import { Meteor } from 'meteor/meteor';
import Recipes from '/imports/api/recipes';

function insertRecipe(id, name, ingredients, procedure, difficulty, time, type, cuisine) {
  Recipes.insert({
    recipeID: id,
    recipeName: name,
    ingredients: ingredients,
    procedure: procedure,
    difficulty: difficulty,
    time: time,
    foodType: type,
    cuisine: cuisine
  });
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (Recipes.find().count() === 0) {
    insertRecipe(
      1,
      "Mom's Spaghetti",
      "tomato sauce, pasta, mushrooms, chicken stock",
      "blah blah blah",
      "Easy",
      30,
      "Dinner",
      "Western"
    );

    insertRecipe(
      2,
      "Dad's Fried Rice",
      "rice, peas, eggs, soy sauce, sausage",
      "blah blah blah",
      "Easy",
      15,
      "Dinner",
      "Asian"
    );

    insertRecipe(
      3,
      "Suzy's Mashed Potatoes",
      "potatoes, garlic butter, salt",
      "blah blah blah",
      "Easy",
      10,
      "Dinner",
      "Western"
    );

    insertRecipe(
      4,
      "Bob's benedict",
      "english muffin, eggs, cheese, ham",
      "blah blah blah",
      "Hard",
      30,
      "Breakfast",
      "Western"
    );
  }
});
