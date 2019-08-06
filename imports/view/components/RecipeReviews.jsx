import React, {Component} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import '../style/RecipeReviews.css';
import Reviews from '../../api/reviews';
import Icon from '@material-ui/core/Icon';
import {Meteor} from 'meteor/meteor';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {Session} from "meteor/session";
import getStars from "../stars";

class RecipeReviews extends Component {

  constructor(props) {
    super(props);

    this.state = {
      review: {recipeID: '', name: '', userID:'', rating: '0', comment: ''},
      warningDialogOpen: false,
      reviewToDelete: {},
      editing: false,
      reviewToUpdateRating: '0'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteCurrReview = this.deleteCurrReview.bind(this);
    this.handleCloseWarningDialog = this.handleCloseWarningDialog.bind(this);
    this.handleDeleteClicked = this.handleDeleteClicked.bind(this);
    this.updateReview = this.updateReview.bind(this);
    this.addReview = this.addReview.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  handleSubmit(event) {
    let newReview = Object.assign({}, this.state.review);
    newReview["userID"] = Meteor.userId();
    newReview["name"] = Meteor.user().name;
    newReview["recipeID"] = this.props.recipe._id;
    newReview["dateAdded"] = new Date();
    event.preventDefault();
    if (this.state.editing) {
      this.updateReview(newReview);
    } else {
      this.addReview(newReview);
    }
  }

  updateReview(newReview) {
    Meteor.call('reviews.update', newReview._id, newReview);
    let totalRating = (this.props.recipe.avgRating * this.props.recipe.numRatings) - Number(this.state.reviewToUpdateRating) + Number(this.state.review.rating);
    let newAvgRating = (this.props.recipe.numRatings > 0 ? totalRating/this.props.recipe.numRatings : 0);
    Meteor.call('recipes.updateAvgRating', this.props.recipe._id, newAvgRating);
    this.setState({review: {recipeID: '', name: '', rating: '0', comment: ''}, editing: false});

  }

  addReview(newReview) {
    Meteor.call('reviews.insert', newReview);

    let totalRating = (this.props.recipe.avgRating * this.props.recipe.numRatings) + Number(this.state.review.rating);
    let numRatings = this.props.recipe.numRatings + 1;
    let newAvgRating = (numRatings > 0 ? totalRating/numRatings : 0);
    Meteor.call('recipes.updateAvgRating', this.props.recipe._id, newAvgRating);
    Meteor.call('recipes.updateNumRatings', this.props.recipe._id, numRatings);
    this.setState({review: {recipeID: '', name: '', rating: '0', comment: ''}});
  }

  handleChange(event) {
    let updatedReview = Object.assign({}, this.state.review);

    updatedReview[event.target.name] = event.target.value;
    this.setState({review: updatedReview});
  }

  handleCloseWarningDialog() {
    this.setState({warningDialogOpen: false, reviewToDelete: {}});
  }

  handleDeleteClicked(currReview) {
    this.setState({warningDialogOpen: true, reviewToDelete: currReview});
  }

  handleEditClicked(reviewByUser) {
    this.setState({review: reviewByUser, editing: true, reviewToUpdateRating: reviewByUser.rating})
  }

  deleteCurrReview() {
    Meteor.call('reviews.remove', this.state.reviewToDelete._id);
    let totalRating = (this.props.recipe.numRatings * this.props.recipe.numRatings) - Number(this.state.reviewToDelete.rating);
    let numRatings = this.props.recipe.numRatings - 1;
    let newAvgRating = (numRatings > 0 ? totalRating/numRatings : 0);
    Meteor.call('recipes.updateAvgRating', this.props.recipe._id, newAvgRating);
    Meteor.call('recipes.updateNumRatings', this.props.recipe._id, numRatings);
    this.handleCloseWarningDialog();
  }

  cancelEdit() {
    this.setState({editing: false, review: {recipeID: '', name: '', userID:'', rating: '0', comment: ''}});
  }

  render() {
    let reviewByUser = this.props.reviews.find(review => {
      return review.userID === Meteor.userId()
    });
    let currKey = 0;
    return (
      <div className="review-container recipe-item" id="non-printable-section">
        <div className="recipe-item-label">
          <Typography variant="h6">Reviews:</Typography>
        </div>
        { this.props.user && (!reviewByUser || this.state.editing)?
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
              <Button type="submit">{this.state.editing? "Update Review" : "Submit Review"}</Button>
              {this.state.editing? <Button onClick={this.cancelEdit}>Cancel</Button> : null}
            </ValidatorForm>
          </div>
           : null
        }
        { reviewByUser && !this.state.editing?
          <div className="each-review your-review" key={currKey++}>
            <div className="review-content">
              <div className="your-review-title review-part">
                Your Review
              </div>
              <div className="review-rating review-part">
              {getStars(Number(reviewByUser.rating), "userReview")}
              </div>
              <div className="review-comment review-part">
                <div>{reviewByUser.comment}</div>
              </div>
            </div>
            <div className="review-action-buttons">
              <div className="delete-review review-part">
                <Tooltip title="Edit Review">
                    <Icon className="icon-delete-review" onClick={() => this.handleEditClicked(reviewByUser)}>edit</Icon>
                </Tooltip>
              </div>
              <div className="delete-review review-part">
                <Tooltip title="Delete Review">
                    <Icon className="icon-delete-review" onClick={() => this.handleDeleteClicked(reviewByUser)}>delete_outline</Icon>
                </Tooltip>
              </div>
            </div>
          </div> : null}
        <div className="list-of-reviews">
          {this.props.reviews.map(review => (
            <div>
              {review.userID === Meteor.userId()? null :
                <div className="each-review" key={currKey++}>
                  <div className="review-content">
                    <div className="review-rating review-part">
                    {getStars(Number(review.rating), "review_" + review.name)}
                    </div>
                    <div className="review-name review-part">
                      <div>{review.name + " says:"}</div>
                    </div>
                    <div className="review-comment review-part">
                      <div>{review.comment}</div>
                    </div>
                  </div>
                </div>
              }
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

}

export default
  withTracker(() => {
    return {
      reviews: Reviews.find({recipeID: Session.get('recipeID')}).fetch(),
      user: Meteor.user(),
      recipe: Recipes.findOne({_id: Session.get('recipeID')})
    };
  })(RecipeReviews);
