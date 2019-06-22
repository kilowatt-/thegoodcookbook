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
import { setRecipeDetails } from '../actions';
import RecipeDetails from './RecipeDetails';
import '../style/RecipeCards.css';

class RecipeCards extends Component {
  state = {
    detailDialogOpen: false
  };

  constructor() {
    super();
    this.openDetailedView = this.openDetailedView.bind(this);
    this.closeRecipeDetails = this.closeRecipeDetails.bind(this);
  }

  openDetailedView(recipe) {
     this.props.setRecipeDetails(recipe);
     this.setState({ detailDialogOpen: true });
  }

  closeRecipeDetails() {
    this.setState({ detailDialogOpen: false });
  };

  render() {
    let recipes = this.filterRecipes(this.props.recipes)

    return (
      <div className="card-container">
          {recipes.map(recipe => (
            <div className="card" key={recipe.recipeID}>
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
                </CardActions>
              </Card>
            </div>
          ))}
        <RecipeDetails
          dialogOpen={this.state.detailDialogOpen}
          closeDialog={this.closeRecipeDetails}
        />
      </div>
    );
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
    return filteredRecipes
  }
}

const mapStateToProps = (state) => { 
  return { searchText: state.inputReducer.searchBar,
          recipeType: state.inputReducer.recipeType,
          selectedDifficulty: state.inputReducer.selectedDifficulty,
          selectedTiming: state.inputReducer.selectedTiming}; 
}

export default compose(
  withTracker(() => {
    return {recipes: Recipes.find().fetch(),};
  }),connect(mapStateToProps, { setRecipeDetails }))(RecipeCards);
