import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";

export default Reviews = new Mongo.Collection("reviews");

Meteor.methods({
    "reviews.insert"(review) {
        Reviews.insert(review);
    },

    "reviews.remove"(reviewId) {
        Reviews.remove(reviewId);
    },

    "reviews.update"(reviewId, newReview) {
        Reviews.update(reviewId, {$set: newReview});
    }
});
