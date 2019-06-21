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
     this.props.openDetailedView();
  }

  closeRecipeDetails() {
    this.props.closeDetailedView();
  };

  render() {
    let recipes = this.props.recipes;
    if (this.props.searchText){
      recipes = recipes.filter((item) => item.recipeName.includes(this.props.searchText))
    }
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
          dialogOpen={this.props.dialogOpen}
          closeDialog={this.closeRecipeDetails}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
    searchText: state.inputReducer.searchBar,
    dialogOpen: state.detailedViewOpened
   };
}

export default compose(
  withTracker(() => {
    return {recipes: Recipes.find().fetch(),};
  }),connect(mapStateToProps, { setRecipeDetails, openDetailedView, closeDetailedView }))(RecipeCards);
