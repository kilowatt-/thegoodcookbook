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
import Icon from '@material-ui/core/Icon';
import { Session } from 'meteor/session'

const PAGE_SIZE = 1

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
    Session.set('recipePage', PAGE_SIZE)
  }

  openDetailedView(recipe) {
     this.props.setRecipeDetails(recipe);
     this.props.openDetailedView();
  }

  closeRecipeDetails() {
    this.props.closeDetailedView();
  };

  render() {
    let recipes = this.props.recipes

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
        <Button onClick={()=>this.moreRecipes()} >More</Button>
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

  moreRecipes() {
    Session.set('recipePage', Session.get('recipePage') + PAGE_SIZE)
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
  Session.set('selectedDifficulty', state.inputReducer.selectedDifficulty)
  Session.set('recipeType', state.inputReducer.recipeType)
  Session.set('selectedTiming', state.inputReducer.selectedTiming)
  Session.set('searchText', state.inputReducer.searchBar)
  Session.set('chipSearch', state.inputReducer.chipSearch)
  return {
          dialogOpen: state.detailedViewOpened,
          favouritesToggle: state.favourites.selected
        };
}

const getFilter = () => {
    var filter = {}
    const difficulty = Session.get('selectedDifficulty')
    const foodType = Session.get('recipeType')
    const selectedTiming = Session.get('selectedTiming')
    const searchText = Session.get('searchText')
    if (difficulty){
      filter.difficulty = difficulty
    }
    if (foodType){
      filter.foodType = foodType
    }
    if (selectedTiming){
      filter.time = {$lt:selectedTiming}
    }
    if (searchText){
      filter.recipeName = { $regex: new RegExp(searchText, "i")}
    }
    return filter
}

export default compose(
  withTracker(() => {

    return {recipes: Recipes.find(getFilter(),{limit:Session.get('recipePage')}).fetch(),
      user: Meteor.user(),
      favourites: (Meteor.user() ? Favourites.findOne({_id: Meteor.userId()}) : null)
    };

  }),connect(mapStateToProps, { setRecipeDetails, openDetailedView, closeDetailedView }))(RecipeCards);
