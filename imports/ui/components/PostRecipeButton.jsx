import Button from '@material-ui/core/Button';
import React from 'react';
import CommonDialog from './CommonDialog.jsx';
import RecipeForm from './RecipeForm.jsx';

class PostRecipeButton extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dialogOpen: false
		};

		this.handleClick = this.handleClick.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
		this.callback = this.callback.bind(this);
	}

	callback() {
		this.closeDialog();
	}

	handleClick(event) {
		event.preventDefault();

		console.log("Got here");

		this.setState( {
			dialogOpen: true
		});
	}

	closeDialog() {
		this.setState({
			dialogOpen:false
		})
	}

	render() {
		return (
			<div className="post_new_recipe">
			<Button variant='contained' color='default' onClick= { this.handleClick }>Post New Recipe</Button>
			<CommonDialog dialogOpen = { this.state.dialogOpen } dialogTitle='Post New Recipe' closeDialog={this.closeDialog} dialogContent= {<RecipeForm callback={this.callback} />}/>
			</div>
			)
	}
}

export default PostRecipeButton;