import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Recipes from '../../api/recipes';
import { Grid, Paper, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { setRecipeDetails, openDetailedView, closeDetailedView } from '../actions';
import RecipeDetails from './RecipeDetails';
import '../style/RecipeCards.css';
import Favourites from '../../api/favourites'

class RecipeCards extends Component {
  state = {
    detailDialogOpen: false
  };

  constructor() {
    super();
    this.openDetailedView = this.openDetailedView.bind(this);
    this.closeRecipeDetails = this.closeRecipeDetails.bind(this);
    this.isInFavourites = this.isInFavourites.bind(this);
    this.addToFavourites = this.addToFavourites.bind(this);
    this.removeFromFavourites = this.removeFromFavourites.bind(this);
  }

  openDetailedView(recipe) {
     this.props.setRecipeDetails(recipe);
     this.props.openDetailedView();
  }

  closeRecipeDetails() {
    this.props.closeDetailedView();
  };

  render() {
    let recipes = this.filterRecipes(this.props.recipes)

    return (
      <div className="card-container">
          {recipes.map(recipe => (
            <div className="card" key={recipe._id}>
              <Card>
                <CardMedia
                  component="img"
                  src="https://i.ibb.co/27fCh60/IMG-0353.jpg"
                  style={{height: "50%"}}
                />
                <CardContent>
                  <div className="card-title-text">
                    <Typography gutterBottom variant="h5" component="h2">
                      {recipe.recipeName}
                    </Typography>
                  </div>
                  <div className="card-summary-info">
                    <Typography>{recipe.difficulty}</Typography>
                    <Typography>{recipe.time + " mins"}</Typography>
                  </div>
                </CardContent>
                <CardActions>
                  <Button onClick={()=>this.openDetailedView(recipe)} size="small">
                    See Recipe
                  </Button>

                  {this.props.user ? <Button size="small" onClick={() => 
                    {this.isInFavourites(recipe) ? this.removeFromFavourites(recipe._id) :
                    this.addToFavourites(recipe._id)
                  }} >{this.isInFavourites(recipe) ? "Unfavourite" : "Favourite"}</Button> : null}
                </CardActions>
              </Card>
            </div>
          ))}
        <RecipeDetails
          dialogOpen={this.props.dialogOpen}
          closeDialog={this.closeRecipeDetails}
        />
      </div>
    );
  }

  isInFavourites(item) {
    return this.props.favourites.favourites.includes(item._id);
  }

  addToFavourites(id) {
    let array = [...this.props.favourites.favourites];

    array.push(id);

    Favourites.update({_id: Meteor.userId()}, {$set: {favourites: array}});
  }

  removeFromFavourites(id) {
    let array = [...this.props.favourites.favourites];

    let index = array.findIndex((str) => str === id);

    if (index !== -1) {
      array.splice(index, 1);

      Favourites.update({_id: Meteor.userId()}, {$set: {favourites: array}});
    }
  }

  filterRecipes(recipes){
    let filteredRecipes = recipes
    if (this.props.searchText){
      filteredRecipes = filteredRecipes.filter((item) => item.recipeName.includes(this.props.searchText))
    }
    if (this.props.recipeType){
      filteredRecipes = filteredRecipes.filter((item) => item.foodType == this.props.recipeType)
    }
    if (this.props.selectedDifficulty){
      filteredRecipes = filteredRecipes.filter((item) => item.difficulty == this.props.selectedDifficulty)
    }
    if (this.props.selectedTiming){
      filteredRecipes = filteredRecipes.filter((item) => item.time < this.props.selectedTiming)
    }
    if (this.props.chipSearch){
      filteredRecipes = filteredRecipes.filter((item) => this.props.chipSearch.every(val => item.ingredients.replace(/\s/g, '').split(",").includes(val)))
    }
    if (this.props.favouritesToggle) {
      filteredRecipes = filteredRecipes.filter((item => this.isInFavourites(item)));
    }

    return filteredRecipes;
  }
}

const mapStateToProps = (state) => {
  return { searchText: state.inputReducer.searchBar,
          recipeType: state.inputReducer.recipeType,
          selectedDifficulty: state.inputReducer.selectedDifficulty,
          selectedTiming: state.inputReducer.selectedTiming,
          dialogOpen: state.detailedViewOpened,
          chipSearch: state.inputReducer.chipSearch,
          favouritesToggle: state.favourites.selected
        };
}

export default compose(
  withTracker(() => {
    
    return {recipes: Recipes.find().fetch(),
      user: Meteor.user(),
      favourites: (Meteor.user() ? Favourites.findOne({_id: Meteor.userId()}) : null)
    };

  }),connect(mapStateToProps, { setRecipeDetails, openDetailedView, closeDetailedView }))(RecipeCards);
