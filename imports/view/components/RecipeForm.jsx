import { Difficulty } from '../../model/Difficulty.jsx';
import { FoodType } from '../../model/FoodType.jsx'
import React from 'react';
import '../style/RecipeForm.css';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {UOM} from '../../model/UnitOfMeasurement.jsx';
import RadioButton from '@material-ui/core/Radio';
import Ingredient from '../../model/Ingredient';
import Recipe from '../../model/Recipe';
import Recipes from '../../api/recipes';
import Select from '@material-ui/core/Select';
import IngredientInputs from './IngredientInputs.jsx';
import QuantityIngredientMap from '../../model/QuantityIngredientMap';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {EMPTY_RECIPE} from '../../model/Recipe.jsx';
import {connect} from 'react-redux';
import {setRecipeDetails} from '../../controller/actions/recipe.js'


class RecipeForm extends React.Component {

	validate() {
		return true;
	}

	closeDialog() {
		this.props.callback();
	}

	constructor(props) {
		super(props);
		
		if (this.props.editing) {
			let arr = this.props.recipe.ingredients;
			let newArr = [];

			arr.forEach((element) => {
				let map = new QuantityIngredientMap(element.quantity, new Ingredient(element.ingredient.name, element.ingredient.uom));
				newArr.push(map);
			});

			let recipe = this.props.recipe;

			recipe.ingredients = newArr;

			this.state = {
				recipe: recipe
			};
		}

		else {
			this.state = {
				recipe: EMPTY_RECIPE
			}
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.addNewIngredient = this.addNewIngredient.bind(this);
		this.removeIngredient = this.removeIngredient.bind(this);

	}

	convertToMap() {
		console.log(JSON.stringify(this.state.recipe.ingredients));
	}

	removeIngredient(id) {
		event.preventDefault();

		console.log(id);

		let recipe = this.state.recipe;

		let mapList = recipe.ingredients.slice();

		mapList.splice(id, 1);

		recipe.ingredients = mapList;

		this.setState({
			recipe: recipe
		});

	}

	addNewIngredient(event) {
		event.preventDefault();

		let recipe = this.state.recipe;

		let ingredient = new Ingredient('', UOM.CUP);
		let qtyMap = new QuantityIngredientMap(1, ingredient);

		let mapList = this.state.recipe.ingredients.slice();

		mapList.push(qtyMap);

		recipe.ingredients = mapList;

		this.setState({
			recipe: recipe
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		if (this.props.editing) {
			let id = this.props.recipe._id;
			Recipes.update({_id: id}, this.state.recipe);

			this.props.setRecipeDetails(this.state.recipe);
		}

		else {
			this.state.recipe.addCreatedBy();
			Recipes.insert(this.state.recipe);
		}

		
		this.closeDialog();

	}

	handleChange(event) {
		let name = [event.target.name][0];

		console.log(name);
		let recipe = this.state.recipe;

		if(!isNaN(parseInt(name[name.length-1], 10))) {
			let idx = parseInt(name.substring(4), 10);


			let ingredients = recipe.ingredients.slice();
			let map = ingredients[idx];

			console.log("typeof map: " + typeof map);

			let elemName = name.substring(0, 3);

			switch (elemName) {
				case 'ing':
					map.ingredient.setName(event.target.value);
					break;
				case 'uom':

					map.ingredient.setUOM(event.target.value);
					break;
				case 'qty':
					map.setQuantity(event.target.value);
					break;
				default:
					break;
			}

			recipe[ingredients] = map;

			this.setState({
				recipe: recipe
			})
		}

		else 
			recipe[event.target.name] = event.target.value;

		this.setState({
				recipe: recipe
			});
		
	}

	render() {
		return (
			<div className="submit_form">
			{ !this.props.closing ?
			<ValidatorForm onSubmit={this.handleSubmit}>
				<label>Recipe Name: </label> <TextValidator validators={['required']} errorMessages={['Required']} name="recipeName" onChange={ this.handleChange } value = { this.state.recipe.recipeName } /><br />
				<label>Ingredients:</label> <IngredientInputs ingredients={this.state.recipe.ingredients} handleChange = {this.handleChange} addNewIngredient={this.addNewIngredient} removeIngredient={this.removeIngredient}/> <Button type='button' color='primary' onClick={this.addNewIngredient}>+ Add New Ingredient</Button> <br />
				<label>Difficulty: </label> <RadioButton name="difficulty" value={Difficulty.EASY} onChange = { this.handleChange } checked= {this.state.recipe.difficulty === Difficulty.EASY} /> Easy
											<RadioButton name="difficulty" value={Difficulty.MEDIUM} onChange = { this.handleChange } checked={this.state.recipe.difficulty === Difficulty.MEDIUM} /> Medium
											<RadioButton name="difficulty" value={Difficulty.HARD} onChange = { this.handleChange } checked={this.state.recipe.difficulty === Difficulty.HARD} /> Hard<br />
				<label>Time: </label> <TextValidator style={{width:30}} validators={['required', 'isNumber', 'minNumber:1']} errorMessages={['Required', 'Must be a number', 'Time must be at least 1 minute']} name="time" onChange = { this.handleChange } value={this.state.recipe.time} /> min<br />
				<label>Image URL:</label> <TextValidator name="imgUrl" validators={['matchRegexp:(http)?s?:?(\/\/[^"\']*\/.+\.(?:png|jpg|jpeg|gif|png|bmp))$'] }
				errorMessages={['Enter valid image URL']} placeholder='Accepted extensions:  .gif, .png, .bmp, .jpg, .jpeg' onChange = {this.handleChange} value = {this.state.recipe.imgUrl} /><br />
				<label>Food Type:</label>   <RadioButton name="foodType" value={FoodType.BREAKFAST} onChange = { this.handleChange } checked= {this.state.recipe.foodType === FoodType.BREAKFAST} />Breakfast
											<RadioButton name="foodType" value={FoodType.LUNCH} onChange = { this.handleChange } checked={this.state.recipe.foodType === FoodType.LUNCH} />Lunch
											<RadioButton name="foodType" value={FoodType.DINNER} onChange = { this.handleChange } checked={this.state.recipe.foodType === FoodType.DINNER} />Dinner
											<RadioButton name="foodType" value={FoodType.SNACK} onChange = { this.handleChange } checked={this.state.recipe.foodType === FoodType.SNACK} />Snack
											<RadioButton name="foodType" value={FoodType.DESSERT} onChange = { this.handleChange } checked={this.state.recipe.foodType === FoodType.DESSERT} />Dessert<br />

				<label>Cuisine: </label> <TextValidator validators={['required']} errorMessages={['Required']} name="cuisine" onChange={ this.handleChange } value = { this.state.recipe.cuisine } /><br />

				<label>Instructions:</label>
				<TextValidator validators={['required']} errorMessages={['Required']} id="procedure" name="procedure" rows='10' multiline={true} fullWidth={true} value={this.state.recipe.procedure} onChange={this.handleChange} variant='outlined'/><br />

				<Button type="submit" className="bt_submit">Submit</Button>


			</ValidatorForm>
			:
			<div>
			<p>Are you sure you want to close? All changes will be lost!</p>
			<Button onClick={this.props.callback}>Yes</Button> <Button onClick={this.props.cancelCloseDialog}>No</Button>
			</div>
		}
			</div>
			)
	}
}

export default connect(null, {setRecipeDetails})(RecipeForm);