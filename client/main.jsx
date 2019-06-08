import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '/imports/ui/App'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '/imports/ui/reducers';

Meteor.startup(() => {
  render(<Provider store={createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}><App /></Provider>,
  document.getElementById('react-target'));
});
