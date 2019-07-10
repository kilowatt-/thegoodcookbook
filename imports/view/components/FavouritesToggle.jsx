import React from 'react';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTracker } from 'meteor/react-meteor-data';
import {toggleFavourites} from '../../controller/actions/favourites.js';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class FavouritesToggle extends React.Component {

	constructor(props) {
		super();
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange() {
		this.props.toggleFavourites();
	}

	render() {
		
		return (
			<div>
			{this.props.user && !this.props.isLoggingIn ?
			<FormControlLabel 
				control={
					<Switch checked={this.props.selected} onChange={this.handleChange} />
				}

				label="Show Favourites Only" /> : null }
			</div>
			)
		}
	}

const mapStateToProps = state => {
	return ({
	selected: state.favourites.selected
	})
};

export default compose(
	withTracker (() => {
		return {
			user: Meteor.user(),
			loggingIn: Meteor.loggingIn()
		}
	}), connect(mapStateToProps, {toggleFavourites}))(FavouritesToggle);