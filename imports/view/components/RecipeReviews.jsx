import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import RadioButton from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import '../style/RecipeReviews.css';
import Reviews from '../../api/reviews';
import Icon from '@material-ui/core/Icon';
import { Meteor } from 'meteor/meteor';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Session} from "meteor/session";
import Recipe from "../../model/Recipe";

class RecipeReviews extends Component {

  constructor(props) {
    super(props);

    this.state = {
      review: {recipeID: '', name: '', userID:'', rating: '0', comment: ''},
      userAlreadyReviewedError: false,
      warningDialogOpen: false,
      reviewToDelete: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getStars = this.getStars.bind(this);
    this.deleteCurrReview = this.deleteCurrReview.bind(this);
    this.handleCloseWarningDialog = this.handleCloseWarningDialog.bind(this);
    this.handleDeleteClicked = this.handleDeleteClicked.bind(this);
  }

  handleSubmit(event) {
    let reviews = this.props.reviews.filter(review =>
      review.recipeID === this.props.recipe._id && review.userID === Meteor.userId()
    )
    if (reviews.length > 0) {
      this.setState({userAlreadyReviewedError: true})
    } else {
      let newReview = this.state.review;
      newReview["userID"] = Meteor.userId();
      newReview["name"] = Meteor.user().name;
      newReview["recipeID"] = this.props.recipe._id;
      newReview["dateAdded"] = new Date();
      event.preventDefault();
      Meteor.call('reviews.insert', newReview);
      let recipeToUpdate = this.props.recipe;
      let totalRating = (this.props.recipe.avgRating * this.props.recipe.numRatings) + Number(this.state.review.rating);
      let numRatings = this.props.recipe.numRatings + 1;
      let newAvgRating = (numRatings > 0 ? totalRating/numRatings : 0);
      Meteor.call('recipes.updateAvgRating', this.props.recipe._id, newAvgRating);
      Meteor.call('recipes.updateNumRatings', this.props.recipe._id, numRatings);
      this.setState({review: {recipeID: '', name: '', rating: '0', comment: ''}});
    }
  }

  handleChange(event) {
    let updatedReview = this.state.review;
    updatedReview[event.target.name] = event.target.value;
    this.setState({review: updatedReview, userAlreadyReviewedError: false});
  }

  handleCloseWarningDialog() {
    this.setState({warningDialogOpen: false, reviewToDelete: {}});
  }

  handleDeleteClicked(currReview) {
    this.setState({warningDialogOpen: true, reviewToDelete: currReview});
  }

  deleteCurrReview() {
    this.setState({userAlreadyReviewedError: false});
    Meteor.call('reviews.remove', this.state.reviewToDelete._id);
    let recipeToUpdate = this.props.recipe;
    let totalRating = (this.props.recipe.numRatings * this.props.recipe.numRatings) - Number(this.state.reviewToDelete.rating);
    let numRatings = this.props.recipe.numRatings - 1;
    let newAvgRating = (numRatings > 0 ? totalRating/numRatings : 0);
    Meteor.call('recipes.updateAvgRating', this.props.recipe._id, newAvgRating);
    Meteor.call('recipes.updateNumRatings', this.props.recipe._id, numRatings);
    this.handleCloseWarningDialog();
  }

  render() {
    let reviews = this.props.reviews.filter(review =>
      review.recipeID === this.props.recipe._id
    )
    let ratings = reviews.map(review => Number(review.rating));
    let totalRating = ratings.reduce( (a,b) => a + b, 0);
    let avgRating = ratings.length > 0? totalRating/ratings.length: 0;
    let avgRatingStars = [];
    for (let i = 0; i < avgRating; i++) {
      avgRatingStars.push(<Icon>star</Icon>);
    }
    let currKey = 0;
    return (
      <div className="review-container recipe-item">
        <div className="recipe-item-label">
          <Typography variant="h6">Reviews:</Typography>
        </div>
        { this.props.user?
          <div className="add-new-review">
            <ValidatorForm onSubmit={this.handleSubmit}>
              <div className="rating-input">
                <label className={Number(this.state.review.rating) >= 5 ? "five-star star-input checked" : "five-star star-input unchecked"}>
                  <input className="rating-input-circle" type="radio" name="rating" value={5} onChange = { this.handleChange }/>
                  <Icon className="input-star-icon">star</Icon>
                  <Icon className="input-star-icon">star</Icon>
                  <Icon className="input-star-icon">star</Icon>
                  <Icon className="input-star-icon">star</Icon>
                  <Icon className="input-star-icon">star</Icon>
                </label>
                <label className={Number(this.state.review.rating) >= 4 ? "four-star star-input checked" : "four-star star-input unchecked"}>
                  <input className="rating-input-circle" type="radio" name="rating" value={4} onChange = { this.handleChange }/>
                  <Icon className="input-star-icon">star</Icon>
                  <Icon className="input-star-icon">star</Icon>
                  <Icon className="input-star-icon">star</Icon>
                  <Icon className="input-star-icon">star</Icon>
                </label>
                <label className={Number(this.state.review.rating) >= 3 ? "three-star star-input checked" : "three-star star-input unchecked"}>
                  <input className="rating-input-circle" type="radio" name="rating" value={3} onChange = { this.handleChange }/>
                  <Icon className="input-star-icon">star</Icon>
                  <Icon className="input-star-icon">star</Icon>
                  <Icon className="input-star-icon">star</Icon>
                </label>
                <label className={Number(this.state.review.rating) >= 2 ? "two-star star-input checked" : "two-star star-input unchecked"}>
                  <input className="rating-input-circle" type="radio" name="rating" value={2} onChange = { this.handleChange }/>
                  <Icon className="input-star-icon">star</Icon>
                  <Icon className="input-star-icon">star</Icon>
                </label>
                <label className={Number(this.state.review.rating) >= 1 ? "one-star star-input checked" : "one-star star-input unchecked"}>
                  <input className="rating-input-circle" type="radio" name="rating" value={1} onChange = { this.handleChange }/>
                  <Icon className="input-star-icon">star</Icon>
                </label>
              </div>
              <div className="comment-input-section">
                <TextValidator className="comment-input-section-text-box"
                              name="comment"
                              onChange={this.handleChange}
                              value={this.state.review.comment}
                              multiline={true}
                              variant='outlined'
                              fullWidth
                              placeholder="Write your review..."/>
              </div>
              <Button type="submit">Submit Review</Button>
              {this.state.userAlreadyReviewedError?
                <span style={{color:"red"}}>You have already reviewed this recipe</span> : null}
            </ValidatorForm>
          </div>
           : null
        }
        <div className="list-of-reviews">
          {reviews.map(review => (
            <div className="each-review" key={currKey++}>
              <div className="review-content">
                <div className="review-rating review-part">
                {this.getStars(Number(review.rating))}
                </div>
                <div className="review-name review-part">
                  <div>{review.name + " says:"}</div>
                </div>
                <div className="review-comment review-part">
                  <div>{review.comment}</div>
                </div>
              </div>
              {review.userID === Meteor.userId()?
                <div className="delete-review review-part">
                  <Tooltip title="Delete Review">
                      <Icon className="icon-delete-review" onClick={() => this.handleDeleteClicked(review)}>delete_outline</Icon>
                  </Tooltip>
                </div> : null}
            </div>
          ))}
        </div>
        <Dialog
        open={this.state.warningDialogOpen}
        onClose={this.handleCloseWarningDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete your review?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.deleteCurrReview} color="primary">
              Yes
            </Button>
            <Button onClick={this.handleCloseWarningDialog} color="primary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
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

export default
  withTracker(() => {
    return {
      reviews: Reviews.find().fetch(),
      user: Meteor.user(),
        recipe: Recipes.findOne({_id: Session.get('recipeID')})
    };
  })(RecipeReviews);
