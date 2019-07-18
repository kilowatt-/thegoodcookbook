import {Meteor} from 'meteor/meteor';

function publish() {
	Meteor.publish('recipes', () => {
		return Recipes.find({});
	});

	Meteor.publish('reviews', () => {
		return Reviews.find({});
	});

	Meteor.publish('favourites', function() {
		if (this.userId)
			return Favourites.find({_id: this.userId});
		else
			return this.ready();
	});

	Meteor.publish('userData', function() {
		if (this.userId)
			return Meteor.users.find(
				{_id: this.userId},
				{fields: {name: 1}});
		
		else 
			return this.ready();
	});
}

export default publish;