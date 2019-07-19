import Button from '@material-ui/core/Button';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { setRecipeDetails } from '../../controller/actions/recipe.js';
import { openDetailedView } from '../../controller/actions/detailedView.js';
import '../style/RandomRecipeButton.css';

class RandomRecipeButton extends React.Component {

	constructor(props) {
		super(props);
		this.random = this.random.bind(this);
	}

	random() {
		let max = this.props.recipes.length;

		let randomIndex = Math.floor(Math.random() * Math.floor(max));
		let recipe = this.props.recipes[randomIndex];

		this.props.setRecipeDetails(recipe);
		this.props.openDetailedView();
	}



	render() {
		return (
			<div className="random-recipe-button-container">
				<Button className="random-recipe-button" variant="outlined" onClick= { this.random }>Random Recipe</Button>
      </div>
			);
	}


}

const mapStateToProps = (state) => {
		return {
			dialogOpen: state.detailedViewOpened
		}
	}

export default compose(
  withTracker(() => {
    return {recipes: Recipes.find().fetch(),};
  }),connect(mapStateToProps, { setRecipeDetails, openDetailedView  }))(RandomRecipeButton);
