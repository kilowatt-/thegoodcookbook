import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Recipes from '../api/recipes';
import { Grid, Paper, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { setRecipeDetails } from './actions';
import RecipeDetails from './RecipeDetails'

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
    return (
      <div className="card-container">
        <Grid container spacing={2} justify="center">
          {this.props.recipes.map(recipe => (
            <Grid item key={recipe.recipeID}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {recipe.recipeName}
                  </Typography>
                  <Typography component="p">{recipe.difficulty}</Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={()=>this.openDetailedView(recipe)} size="small" color="primary">
                    See Recipe
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <RecipeDetails
          dialogOpen={this.state.detailDialogOpen}
          closeDialog={this.closeRecipeDetails}
        />
      </div>
    );
  }
}

export default compose(
  withTracker(() => {
    return {recipes: Recipes.find().fetch(),};
  }),connect(null, { setRecipeDetails }))(RecipeCards);
