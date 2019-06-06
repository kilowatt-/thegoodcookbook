import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import '../style/RecipeDetails.css'

class RecipeDetails extends Component {
  getDialogContent() {
    return (
      <div className="recipe-details-content">
        <div className="recipe-image">
          <Card>
            <CardMedia
              component="img"
              src="https://i.ibb.co/27fCh60/IMG-0353.jpg"
              style={{height: "50%"}}
            />
          </Card>
        </div>
        <div className="recipe-details-category-container">
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
          {this.props.recipe.ingredients}
        </div>
        <div className="recipe-procedure recipe-item">
          <div className="recipe-item-label">
            <Typography variant="h6">Procedure:</Typography>
          </div>
          {this.props.recipe.procedure}
        </div>
      </div>
    );
  }

  getDialogActions() {
    return (
      <div></div>
    );
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

const mapStateToProps = (state) => {
  return {recipe: state.detailedRecipe};
}

export default connect(mapStateToProps)(RecipeDetails);
