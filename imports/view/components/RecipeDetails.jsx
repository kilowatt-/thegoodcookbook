import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import CommonDialog from './CommonDialog'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import '../style/RecipeDetails.css';
import RecipeReviews from './RecipeReviews';
import EditRecipeButton from './EditRecipeButton';
import Icon from '@material-ui/core/Icon';
import { Session } from 'meteor/session'
import Recipe from "../../model/Recipe";

class RecipeDetails extends Component {
  getDialogContent() {
    return (
      <div className="recipe-details-content">
      <EditRecipeButton />
        <div className="recipe-image">
          <Card>
            <CardMedia className="recipe-details-image"
              component="img"
              src={this.props.recipe.imgUrl}
              style={{height: "50%"}}
            />
          </Card>
        </div>
        <div className="ratings-stars">
          {this.getStars(this.props.recipe.avgRating)}
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
          <ul>
            {this.getProcedureList(this.props.recipe.procedure)}
          </ul>
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

  getDialogActions() {
    return (
      <div></div>
    );
  }

  getStars(rating) {
    let numStars = 0;
    let stars = [];
    for(let i = 0; i < rating; i++) {
      stars.push(<Icon color="primary" fontSize="large">star</Icon>);
      numStars++;
    }
    for(let i = numStars; i < 5; i++) {
      stars.push(<Icon color="disabled" fontSize="large">star</Icon>)
    }
    return stars;
  }

  render() {
      return (
        <div>
          <CommonDialog
            closeDialog={this.props.closeDialog}
            dialogOpen={this.props.dialogOpen}
            dialogTitle={this.props.recipe.recipeName}
            dialogContent={this.getDialogContent()}
            dialogActions={this.getDialogActions()}
          />
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    recipe: (Session.get('recipeID') === '' ? Recipe.constructEmptyRecipe() : Recipes.findOne({_id: Session.get('recipeID')}))
  }
})(RecipeDetails);
