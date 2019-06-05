import { Difficulty } from '../../util/Difficulty.jsx';
import { FoodType } from '../../util/FoodType.jsx'
import React from 'react';
import '../style/RecipeForm.css';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {UOM} from '../../util/UnitOfMeasurement.jsx';
import RadioButton from '@material-ui/core/Radio';
import Ingredient from '../../util/Ingredient';
import Recipe from '../../util/Recipe';
import Recipes from '../../api/recipes'

class RecipeForm extends React.Component {

	validate() {
		return true;
	}

	constructor(props) {
		super(props);


		this.state = {
			recipeName: '',
			ingredients: [],
			procedure: '',
			difficulty: Difficulty.EASY,
			time: 0,
			foodType: FoodType.BREAKFAST,
			cuisine: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.addNewIngredient = this.addNewIngredient.bind(this);

	}

	addNewIngredient(event) {
		event.preventDefault();
	}

	

	handleSubmit(event) {
		event.preventDefault();

		if (this.validate()) {
			let recipe = new Recipe(this.state.recipeName, this.state.ingredients, this.state.procedure,
				this.state.difficulty, this.state.time, this.state.foodType, this.state.cuisine);
			Recipes.insert(recipe);

		}
	}

	handleChange(event) {
		this.setState({
				[event.target.name]: event.target.value
			});
	}

	render() {

		return (
			<div className="submit_form">
			<form onSubmit={this.handleSubmit}>
				<label>Name: </label> <Input type="text" name="recipeName" onChange={ this.handleChange } placeholder="Recipe Name" value = { this.state.recipeName } /><br />
				<label>Ingredients:</label> <Input type="text" name="ingredients" onChange={ this.handleChange }/><Button type='button' onClick={this.addNewIngredient}>+</Button><br />
				<label>Difficulty: </label> <RadioButton name="difficulty" value={Difficulty.EASY} onChange = { this.handleChange } checked= {this.state.difficulty === Difficulty.EASY} /> Easy
											<RadioButton name="difficulty" value={Difficulty.MEDIUM} onChange = { this.handleChange } checked={this.state.difficulty === Difficulty.MEDIUM} /> Medium
											<RadioButton name="difficulty" value={Difficulty.HARD} onChange = { this.handleChange } checked={this.state.difficulty === Difficulty.HARD} /> Hard<br />
				<label>Time: </label> <Input type="text" name="time" onChange = { this.handleChange } /> min<br />

				<label>Food Type:</label>   <RadioButton name="foodType" value={FoodType.BREAKFAST} onChange = { this.handleChange } checked= {this.state.foodType === FoodType.BREAKFAST} />Breakfast
											<RadioButton name="foodType" value={FoodType.LUNCH} onChange = { this.handleChange } checked={this.state.foodType === FoodType.LUNCH} />Lunch
											<RadioButton name="foodType" value={FoodType.DINNER} onChange = { this.handleChange } checked={this.state.foodType === FoodType.DINNER} />Dinner
											<RadioButton name="foodType" value={FoodType.SNACK} onChange = { this.handleChange } checked={this.state.foodType === FoodType.SNACK} />Snack
											<RadioButton name="foodType" value={FoodType.DESSERT} onChange = { this.handleChange } checked={this.state.foodType === FoodType.DESSERT} />Dessert<br />

				<label>Cuisine: </label> <Input type="text" name="cuisine" onChange={ this.handleChange } value = { this.state.cuisine } /><br />

				<label>Instructions:</label>
				<TextField id="procedure" name="procedure" rows='10' multiline={true} fullWidth={true} value={this.state.procedure} onChange={this.handleChange} variant='outlined'/><br />

				<Button type="submit" className="bt_submit">Submit</Button>


			</form>
			</div>
			)
	}
}

export default RecipeForm;