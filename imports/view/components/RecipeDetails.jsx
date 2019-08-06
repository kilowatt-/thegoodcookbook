import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import CommonDialog from './CommonDialog'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import '../style/RecipeDetails.css';
import RecipeReviews from './RecipeReviews';
import EditRecipeButton from './EditRecipeButton';
import Icon from '@material-ui/core/Icon';
import { Session } from 'meteor/session'
import Recipe from "../../model/Recipe";
import Tooltip from '@material-ui/core/Tooltip';
import getStars from "../stars";

class RecipeDetails extends Component {
  constructor(props) {
    super(props);
    this.isInFavourites = this.isInFavourites.bind(this);
    this.addToFavourites = this.addToFavourites.bind(this);
    this.removeFromFavourites = this.removeFromFavourites.bind(this);
  }

  isInFavourites(item) {
      if (this.props.favourites)
          return this.props.favourites.favourites.includes(item._id);
      return false;
  }

  addToFavourites(id) {
    let array = [...this.props.favourites.favourites];

    array.push(id);

    Meteor.call('favourites.update', Meteor.userId(), array);
    Meteor.call('recipes.increaseFavouriteCount', id);
  }

  removeFromFavourites(id) {
    let array = [...this.props.favourites.favourites];

    let index = array.findIndex((str) => str === id);

    if (index !== -1) {
      array.splice(index, 1);

      Meteor.call('favourites.update', Meteor.userId(), array);
      Meteor.call('recipes.decreaseFavouriteCount', id);
    }
  }

  getDialogContent() {
    return (
      <div className="recipe-details-content">
        <EditRecipeButton/>
        <div className="recipe-image">
          <Card>
            <CardMedia className="recipe-details-image"
              component="img"
              src={this.props.recipe.imgUrl}
              style={{height: "50%"}}
            />
          </Card>
        </div>
        <div className="stars-hearts">
          <div className="ratings-stars">
            {getStars(this.props.recipe.avgRating, "detail")}
          </div>
          <div className="title-favourite-button">
            {this.isInFavourites(this.props.recipe) ?
              <Tooltip title="Unfavorite">
                <Button onClick={() => this.removeFromFavourites(this.props.recipe._id)}>
                  <Icon className="icon-favourited-review favorite-icon">favorite</Icon>
                </Button>
              </Tooltip> :
              <Tooltip title="Favorite">
                <Button onClick={() =>this.addToFavourites(this.props.recipe._id)}>
                  <Icon className="icon-not-favourited-review favorite-icon">favorite_border</Icon>
                </Button>
              </Tooltip>}
          </div>
        </div>
        <div className="recipe-details-category-container recipe-item">
          <div className="recipe-item">
            <span className="recipe-category-label">Difficulty: </span>
            {this.props.recipe.difficulty}
          </div>
          <div className="recipe-item">
            <span className="recipe-category-label">Time Needed: </span>
            {this.props.recipe.time + " mins"}
          </div>
          <div className="recipe-item">
            <span className="recipe-category-label">Food Type: </span>
            {this.props.recipe.foodType}
          </div>
          <div className="recipe-item">
            <span className="recipe-category-label">Cuisine: </span>
            {this.props.recipe.cuisine}
          </div>
        </div>
        <div className="recipe-ingredients recipe-item">
          <div className="recipe-item-label">
            <Typography variant="h6">Ingredients:</Typography>
          </div>
          <ul>
            {this.getIngredientsList(this.props.recipe.ingredients)}
          </ul>
        </div>
        <div className="recipe-procedure recipe-item">
          <div className="recipe-item-label">
            <Typography variant="h6">Procedure:</Typography>
          </div>
          <ol>
            {this.getProcedureList(this.props.recipe.procedure)}
          </ol>
        </div>

        <RecipeReviews />
      </div>
    );
  }

  getIngredientsList(ingredients) {
    let id=0;
    if (ingredients instanceof Array ) {
      return ingredients.map(ingredient => {
        return (<li key={id++}>
                  {ingredient.quantity +
                    " " +
                    ingredient.ingredient.uom +
                    " " +
                    ingredient.ingredient.name}
                  </li>);
      });
    } else {
      return (<li key="0">{ingredients}</li>);
    }
  }

  getProcedureList(procedure) {
    let id = 0;
    if (procedure instanceof Array ) {
      return procedure.map(step => {
        return (<li key={id++}>
                  {step}
                  </li>);
      });
    } else {
      return (<li key={0}>{procedure}</li>);
    }
  }

  render() {
      return (
        <div> {
          this.props.recipe?
          <CommonDialog
            closeDialog={this.props.closeDialog}
            dialogOpen={this.props.dialogOpen}
            dialogTitle={this.props.recipe.recipeName}
            dialogContent={this.getDialogContent()}
          /> : null
        }
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    recipe: (Session.get('recipeID') === '' ? Recipe.constructEmptyRecipe() : Recipes.findOne({_id: Session.get('recipeID')})),
    favourites: Favourites.findOne({_id: Meteor.userId()})
  }
})(RecipeDetails);
