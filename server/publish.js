import {Meteor} from 'meteor/meteor';

function publish() {
	Meteor.publish('recipes', () => {
		return Recipes.find({});
	});

	Meteor.publish('reviews', () => {
		return Reviews.find({});
	});

	Meteor.publish('favourites', () => {
		return Favourites.find({});
	})

}

export default publish;