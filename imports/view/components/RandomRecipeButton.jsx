import Button from '@material-ui/core/Button';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { setRecipeDetails } from '../../controller/actions/recipe.js';
import { openDetailedView } from '../../controller/actions/detailedView.js';
import '../style/RandomRecipeButton.css';
import {getFilter} from "./RecipeCards";

class RandomRecipeButton extends React.Component {

	constructor(props) {
		super(props);
		this.random = this.random.bind(this);
	}

	random() {
		let max = this.props.recipes.length;

		let randomIndex = Math.floor(Math.random() * Math.floor(max));
		let recipeID = this.props.recipes[randomIndex]._id;

		Session.set('recipeID', recipeID);

		this.props.openDetailedView();
	}

	render() {
		return (
			<div className="random-recipe-button-container">
				<Button variant='outlined' className="random-recipe-button" onClick= { this.random }>Random Recipe</Button>
      </div>
			);
	}
}

const mapStateToProps = (state) => {
		return {
			dialogOpen: state.detailedViewOpened
		}
	};

export default compose(
  withTracker(() => {
    return {recipes: Recipes.find(getFilter()).fetch(),};
  }),connect(mapStateToProps, { setRecipeDetails, openDetailedView  }))(RandomRecipeButton);
