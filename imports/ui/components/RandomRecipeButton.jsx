import Button from '@material-ui/core/Button';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { setRecipeDetails } from '../actions';
import RecipeDetails from './RecipeDetails.jsx'


class RandomRecipeButton extends React.Component {

	constructor(props) {
		super(props);
		this.random = this.random.bind(this);

		this.state = { detailDialogOpen: false };
		this.closeDialog = this.closeDialog.bind(this);
	}

	random() {
		let max = this.props.recipes.length;

		let randomIndex = Math.floor(Math.random() * Math.floor(max));
		let recipe = this.props.recipes[randomIndex];

		this.props.setRecipeDetails(recipe);
		this.setState({ detailDialogOpen: true });
	}

	closeDialog() {
		this.setState({ detailDialogOpen: false });
	}


	render() {
		return (
			<div>
			<Button variant='contained' color='default' onClick= { this.random }>Random Recipe</Button>
			<RecipeDetails
          dialogOpen={this.state.detailDialogOpen}
          closeDialog={this.closeDialog}
        	/>
        	</div>
			);
	}
}

export default compose(
  withTracker(() => {
    return {recipes: Recipes.find().fetch(),};
  }),connect(null, { setRecipeDetails }))(RandomRecipeButton);