import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker'
import { render } from 'react-dom';
import App from '/imports/view/App'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '/imports/controller/reducers';


Meteor.startup(() => {

	Tracker.autorun(() => {
		if (Meteor.user())
			Meteor.subscribe('userName');
		
		Meteor.subscribe('reviews');
		Meteor.subscribe('recipes');
    	Meteor.subscribe('favourites');
	})

	const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  render(<Provider store={store}><App /></Provider>,
  document.getElementById('react-target'));

});
