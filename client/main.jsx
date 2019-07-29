import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker'
import { render } from 'react-dom';
import App from '/imports/view/App'
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import reducers from '/imports/controller/reducers';
import {recipeLoadBegin, recipeLoadError, recipeLoadSuccess} from "../imports/controller/actions/recipe";
import {getFavouritesBegin, getFavouritesError, getFavouritesSuccess} from "../imports/controller/actions/favourites";

function loadOnStartup(store) {
	store.dispatch(recipeLoadBegin());
	store.dispatch(getFavouritesBegin());
}

Meteor.startup(() => {

	const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  render(<Provider store={store}><App /></Provider>,
  document.getElementById('react-target'));

  	loadOnStartup(store);

	Tracker.autorun(() => {
		Meteor.subscribe('reviews');
		Meteor.subscribe('recipes', {onReady: () => {store.dispatch(recipeLoadSuccess())}});
		Meteor.subscribe('favourites', {onReady: () => {store.dispatch(getFavouritesSuccess())}});
		Meteor.subscribe('userData');
	});

});
