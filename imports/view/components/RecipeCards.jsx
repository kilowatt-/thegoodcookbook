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
import { openDetailedView, closeDetailedView } from '../../controller/actions/detailedView.js';
import { setRecipeDetails } from '../../controller/actions/recipe.js';
import RecipeDetails from './RecipeDetails';
import '../style/RecipeCards.css';
import Favourites from '../../api/favourites';
import Icon from '@material-ui/core/Icon';
import { Meteor } from 'meteor/meteor';

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
    this.getStars = this.getStars.bind(this);
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
                  src={recipe.imgUrl}
                  style={{height: "50%"}}
                />
                <CardContent>
                  <div className="card-title-text">
                    <Typography gutterBottom variant="h5" component="h2">
                      {recipe.recipeName}
                    </Typography>
                  </div>
                  <div className="card-rating-stars">
                    {this.getStars(Number(recipe.avgRating))}
                  </div>
                  <div className="card-summary-info">
                    <div className="card-summary-info-item">
                      <Typography>{recipe.difficulty}</Typography>
                    </div>
                    <div className="card-summary-info-item">
                      <Icon>access_time</Icon>
                      <Typography>{recipe.time + " mins"}</Typography>
                    </div>
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

    Meteor.call('favourites.update', Meteor.userId(), array);
  }

  removeFromFavourites(id) {
    let array = [...this.props.favourites.favourites];

    let index = array.findIndex((str) => str === id);

    if (index !== -1) {
      array.splice(index, 1);

      Meteor.call('favourites.update', Meteor.userId(), array);
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
      filteredRecipes = filteredRecipes.filter((item) => {
        let ing = item.ingredients.map(x => x.ingredient.name)
        return this.props.chipSearch.every(val => {
          return ing.includes(val)
        })
      })
    }
    if (this.props.favouritesToggle) {
      filteredRecipes = filteredRecipes.filter((item => this.isInFavourites(item)));
    }

    return filteredRecipes;
  }

  getStars(rating) {
    let stars = [];
    for(let i = 0; i < rating; i++) {
      stars.push(<Icon color="primary">star</Icon>);
    }
    for(let i = rating; i < 5; i++) {
      stars.push(<Icon color="disabled">star</Icon>)
    }
    return stars;
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
