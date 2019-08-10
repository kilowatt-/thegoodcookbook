CS 436I Project Proposal

Application: Recipe web app

Project Title: The GoodCookBook

[Project Report](REPORT.md) | [Project Structure](STRUCTURE.md)

### High Level Project Description:
The good cook book is a web application for users to browse cooking recipes, add their own, and review other recipes. To make finding recipes easier, users can filter the recipes based on things such as cuisine, difficulty level, and even ingredients needed to make the recipe.

### Project Description (3-5 sentences on your project topic):
The GoodCookBook is a recipe discovery app targeting anybody who cooks or wants to learn to cook. Our web app will provide users with recipes containing ingredients, ratings, time to cook, difficulty, and instructions. Users will be able to find new recipes based on food categories, as well as add comments and ratings  for recipes they do or don’t like. A stretch goal for our project will be to add a sign up/login functionality allowing users to save recipes for later. The app will store two major types of data: recipe data (which would contain information like food categories, difficulty, instructions), and should our stretch goals be implemented, will store user data, such as name, recipes posted, recipes saved and reviews.

### Project task requirements:
#### 3-5 minimal requirements (will definitely complete):
* Give users the ability to add a new recipe by creating a “Add new recipe” button on the home page that will then lead users to a form they can fill out and submit.
* Have a homepage that shows all the recipes as cards.
* View individual recipes by clicking on them from the home page which will open a an individual recipe view. This individual recipe view will have all the recipe information including  time, cuisine, food type, difficulty, ingredients, and instructions.
#### 3-7 "standard" requirements (will most likely complete):
* Users will be able to search for recipes that use a subset of the ingredients they input (i.e if a user searches for recipes that use tomatoes and pasta, our search engine will return a list of ingredients that use tomatoes and pasta, tomatoes only, or pasta only)
* Allow users to rate recipes. This will be added to the individual recipe view and users will be able to see each recipe’s rating on the home page.
* Add a comments section on the individual recipe view. Here, users of the application can add a new comment and look at comments that have been left.
* Add filter onto home page to filter recipes based on cuisine, type of food (eg. dessert, dinner, etc), time a recipe takes.
* Add search bar on the home page where users can search for a specific recipe card.
“Random” recipe feature that will pick a random recipe card for the user.
#### 2-3 stretch requirements (hope to complete 1!)
* Allow users to have an account. Therefore we would need a sign up function and a login function.
* Allow signed in users to save recipes for later.
* Recommend recipes based on user’s ratings/saved recipes

### Pick 2 of your minimal requirements and break each of them down into ~2-5 smaller tasks!
#### Home page:
* Cards for each individual recipe with the recipe title and rating
* Get recipes from the database/backend
* Populate cards with recipe data from backend
* Implement grid view to hold each card
#### Add a new recipe:
* Add recipe to database once user submits and bring user back to refreshed home view
* Frontend form for user to fill out (text boxes for title, time, and instructions. Drop downs for difficulty, food type, and cuisine. Input field for ingredients)
* Button on the homepage that will open a dialog box that shows the recipe form
* Alert box that opens when x button is clicked (ie. when user tries to close the dialog box)
* Alert box will take user to home page if user clicks confirm and will take user back to the form if user clicks cancel

### Draw 2-3 rough sketch prototypes of some key tasks of your app. Sketch these physically on paper and then scan and add to your repo.

![prototype](prototype.jpeg)
