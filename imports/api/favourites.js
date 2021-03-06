import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";

export default Favourites = new Mongo.Collection("favourites");

Meteor.methods({
    "favourites.update"(userId, updatedFavorites) {
        Favourites.update(userId, {$set: {favourites: updatedFavorites}});
    }
});
