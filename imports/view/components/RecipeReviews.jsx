import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import RadioButton from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import '../style/RecipeReviews.css';
import Reviews from '../../api/reviews';
import Icon from '@material-ui/core/Icon';
import Recipes from '../../api/recipes';
import { Meteor } from 'meteor/meteor';

class RecipeReviews extends Component {

  validate() {
    return true;
  }

  constructor() {
    super();

    this.state = {
      review: {recipeID: '', name: '', rating: '0', comment: ''}
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getStars = this.getStars.bind(this);
  }

  handleSubmit(event) {
    let newReview = this.state.review;
    newReview["recipeID"] = this.props.recipe._id;
    newReview["dateAdded"] = new Date();
    event.preventDefault();
    Meteor.call('reviews.insert', newReview);
    let recipeToUpdate = this.props.recipe;
    let totalRating = (this.props.recipe.avgRating * this.props.recipe.numRatings) + Number(this.state.review.rating);
    recipeToUpdate["numRatings"] = this.props.recipe.numRatings + 1;
    let newAvgRating = totalRating/recipeToUpdate.numRatings;
    Meteor.call('recipe.updateAvgRating', this.props.recipe._id, newAvgRating);
    this.setState({review: {recipeID: '', name: '', rating: '0', comment: ''}});
  }

  handleChange(event) {
    let updatedReview = this.state.review;
    updatedReview[event.target.name] = event.target.value;
    this.setState({review: updatedReview});
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
        <div className="add-new-review">
          <ValidatorForm onSubmit={this.handleSubmit} className={this.props.user? "show" : "hide"}>
            <div className="title-text">Add New Review</div>
            <label>Name: </label>
            <TextValidator validators={['required']} errorMessages={['Required']} name="name" onChange={this.handleChange} value={this.state.review.name}/><br />
            <label>Rating: </label>
            <RadioButton name="rating" value={0} onChange = { this.handleChange } checked={this.state.review.rating === '0'} />0
            <RadioButton name="rating" value={1} onChange = { this.handleChange } checked={this.state.review.rating === '1'} />1
            <RadioButton name="rating" value={2} onChange = { this.handleChange } checked={this.state.review.rating === '2'} />2
            <RadioButton name="rating" value={3} onChange = { this.handleChange } checked={this.state.review.rating === '3'} />3
            <RadioButton name="rating" value={4} onChange = { this.handleChange } checked={this.state.review.rating === '4'} />4
            <RadioButton name="rating" value={5} onChange = { this.handleChange } checked={this.state.review.rating === '5'} />5<br />
            <label>Comment: </label>
            <TextValidator name="comment" onChange={this.handleChange} value={this.state.review.comment} multiline={true} variant='outlined'/>
            <Button type="submit" className="bt_submit">Submit</Button>
          </ValidatorForm>
        </div>
        <div className="list-of-reviews">
          {reviews.map(review => (
            <div className="each-review" key={currKey++}>
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
          ))}
        </div>
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

const mapStateToProps = (state) => {
  return {
    recipe: state.detailedRecipe
  };
}

export default compose(
  withTracker(() => {
    return {reviews: Reviews.find().fetch(),
      user: Meteor.user()
    };
  }),connect(mapStateToProps))(RecipeReviews);
