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
	});

	Meteor.publish('userName', () => {
		return Meteor.users.find({_id: this.userId}, {fields: {'name': 1}});
	});

}

export default publish;