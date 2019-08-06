import Button from '@material-ui/core/Button';
import React from 'react';
import CommonDialog from './CommonDialog.jsx';
import RecipeForm from './RecipeForm.jsx';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import Icon from '@material-ui/core/Icon';

class EditRecipeButton extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dialogOpen: false,
			closing: false
		};

		this.handleClick = this.handleClick.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
		this.callback = this.callback.bind(this);
		this.confirmCloseDialog = this.confirmCloseDialog.bind(this);
		this.cancelCloseDialog = this.cancelCloseDialog.bind(this);
	}

	callback() {
		this.setState ({
			closing: false
		});
		this.closeDialog();
	}

	handleClick(event) {
		event.preventDefault();

		this.setState( {
			dialogOpen: true
		});
	}

	confirmCloseDialog() {

		this.setState ({
			closing:true
		});
	}

	cancelCloseDialog() {
		this.setState ({
			closing: false
		});
	}

	closeDialog() {
		this.setState({
			dialogOpen:false
		})
	}

	render() {

		return (
			<div className="edit_recipe">
			{this.props.user && Meteor.userId() === this.props.recipe.createdBy ?
			<div>

			<Button onClick= { this.handleClick }>
					<Icon className="icon-edit">edit</Icon> Edit Recipe
			</Button>

			<CommonDialog dialogOpen = { this.state.dialogOpen } dialogTitle='Edit Recipe' closeDialog={!this.state.closing && this.confirmCloseDialog} dialogContent=
			{<RecipeForm callback={this.callback} closing={this.state.closing}
			cancelCloseDialog = {this.cancelCloseDialog} editing={true} recipe={this.props.recipe} />}/>
			</div> : null }
			</div>

			)
	}
}


export default withTracker(() => {
    return {user: Meteor.user(),
    recipe: Recipes.findOne({_id: Session.get('recipeID')})}
  })(EditRecipeButton);
