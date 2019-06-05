import { Difficulty } from '../../util/Difficulty.js';
import { FoodType } from '../../util/FoodType.js'
import React from 'react';
import '../style/RecipeForm.css';

class RecipeForm extends React.Component {
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
	}

	handleChange(event) {
		this.setState({
				[event.target.name]: event.target.value
			});
	}

	render() {
		return (
			<div class="popup">
			<h1>Submit New Recipe</h1>
			<form onSubmit={this.handleSubmit}>
				<label>Name: </label> <input type="text" name="name" onChange={ this.handleChange } placeholder="Recipe Name" value = { this.state.recipeName } /><br />
				<label>Ingredients:</label> <input type="text" name="ingredients" onChange={ this.handleChange }/><button type='button' onClick={this.addNewIngredient}>+</button><br />
				<label>Difficulty: </label> <input type="radio" name="difficulty" value={Difficulty.EASY} onChange = { this.handleChange } checked= {this.state.difficulty === Difficulty.EASY} /> Easy
											<input type="radio" name="difficulty" value={Difficulty.MEDIUM} onChange = { this.handleChange } checked={this.state.difficulty === Difficulty.MEDIUM} /> Medium
											<input type="radio" name="difficulty" value={Difficulty.HARD} onChange = { this.handleChange } checked={this.state.difficulty === Difficulty.HARD} /> Hard<br />
				<label>Time: </label> <input type="text" name="time" onChange = { this.handleChange } /> min<br />

				<label>Food Type:</label>   <input type="radio" name="foodType" value={FoodType.BREAKFAST} onChange = { this.handleChange } checked= {this.state.foodType === FoodType.BREAKFAST} />Breakfast
											<input type="radio" name="foodType" value={FoodType.LUNCH} onChange = { this.handleChange } checked={this.state.foodType === FoodType.LUNCH} />Lunch
											<input type="radio" name="foodType" value={FoodType.DINNER} onChange = { this.handleChange } checked={this.state.foodType === FoodType.DINNER} />Dinner
											<input type="radio" name="foodType" value={FoodType.SNACK} onChange = { this.handleChange } checked={this.state.foodType === FoodType.SNACK} />Snack
											<input type="radio" name="foodType" value={FoodType.DESSERT} onChange = { this.handleChange } checked={this.state.foodType === FoodType.DESSERT} />Dessert<br />

				<label>Cuisine: </label> <input type="text" name="cuisine" onChange={ this.handleChange } value = { this.state.cuisine } /><br />

				<label>Instructions:</label>
				<textarea rows="20" cols="50" name="procedure" onChange={this.handleChange} value= {this.state.procedure} /><br />

				<button type="submit">Submit</button>


			</form>
			</div>
			)
	}
}

export default RecipeForm;