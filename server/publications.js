import {Meteor} from 'meteor/meteor'

Meteor.publish('userInfo', 
	() => {

		return Meteor.users.find(this.userId,
			{fields: {favourites: 1}})
	});


