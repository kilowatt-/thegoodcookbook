import {Difficulty} from '../../model/Difficulty.js';
import {FoodType} from '../../model/FoodType.js'
import React from 'react';
import '../style/RecipeForm.css';
import Button from '@material-ui/core/Button';
import {UOM} from '../../model/UnitOfMeasurement.js';
import RadioButton from '@material-ui/core/Radio';
import Ingredient from '../../model/Ingredient';
import Recipe from '../../model/Recipe';
import {NO_IMAGE_URL} from '../../model/NoImgUrl'
import IngredientInputs from './IngredientInputs.jsx';
import StepsInput from './StepsInput'
import QuantityIngredientMap from '../../model/QuantityIngredientMap';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import {Meteor} from 'meteor/meteor';
import FormLabel from '@material-ui/core/FormLabel';
import {withStyles} from '@material-ui/core/styles';

const styles = {
    cssOutlinedInput: {
      "&$cssFocused $notchedOutline": {
        borderColor: "#A5AD8B"
      }
    },
    notchedOutline: {},
    cssFocused: {},
  };

class RecipeForm extends React.Component {

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
				recipe: Object.assign({}, recipe)
			};
		}

		else {
			this.state = {
				recipe: Recipe.constructEmptyRecipe()
			}
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.addNewIngredient = this.addNewIngredient.bind(this);
		this.removeIngredient = this.removeIngredient.bind(this);

		this.addNewStep = this.addNewStep.bind(this);
		this.removeStep = this.removeStep.bind(this);
		this.closeDialog = this.closeDialog.bind(this);

	}

	componentWillMount() {
		ValidatorForm.addValidationRule('gtZero', (value) => {
			return !isNaN(value) && value > 0;

		});
	}

	addNewStep(event) {
		event.preventDefault();

		let recipe = this.state.recipe;
		let procedure = recipe.procedure.slice();

		procedure.push('');
		recipe.procedure = procedure;

		this.setState({
			recipe: recipe
		});
	}

	removeStep(index) {

		let recipe = this.state.recipe;

		let procedure = recipe.procedure.slice();

		procedure.splice(index, 1);

		recipe.procedure = procedure;

		this.setState({
			procedure: procedure
		})
	}

	removeIngredient(id) {

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
			let recipeToAdd = this.state.recipe;
			if(recipeToAdd.imgUrl === '') {
				recipeToAdd.imgUrl = NO_IMAGE_URL;
			}
			Meteor.call('recipes.updateRecipe', id, recipeToAdd);

		}

		else {
			this.state.recipe.addCreatedBy();
			let recipeToAdd = this.state.recipe;
			if(recipeToAdd.imgUrl === '') {
				recipeToAdd.imgUrl = NO_IMAGE_URL;
			}
			Meteor.call('recipes.insert', recipeToAdd);
		}


		this.closeDialog();

	}

	handleChange(event) {
		let name = [event.target.name][0];

		let recipe = this.state.recipe;

		if(!isNaN(parseInt(name[name.length-1], 10))) {
			let idx = parseInt(name.substring(4), 10);

			let elemName = name.substring(0, 3);

			if (elemName !== 'stp') {
				let ingredients = recipe.ingredients.slice();
				let map = ingredients[idx];

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

			}

			else {
				let procedure = recipe.procedure.slice();

				procedure[idx] = event.target.value;

				recipe.procedure = procedure;
			}
		}

		else
			recipe[event.target.name] = event.target.value;

		this.setState({
				recipe: recipe
			});

	}

	render() {
		const { classes } = this.props;
		return (
			<div className="submit_form">
			{ !this.props.closing ?
			<ValidatorForm onSubmit={this.handleSubmit}>
				<div className="recipe-name-input recipe-form-input text-input">
					<FormLabel component="legend">Recipe Name</FormLabel>
					<TextValidator className="recipe-input-text-box"
												validators={['required']}
												errorMessages={['Required']}
												name="recipeName"
												onChange={ this.handleChange }
												value = { this.state.recipe.recipeName }
												fullWidth
												variant="outlined"
												InputProps={{
      				            classes: {
      				              root: classes.cssOutlinedInput,
      				              focused: classes.cssFocused,
      				              notchedOutline: classes.notchedOutline,
      				            }
      				          }}/>
				</div>
				<div className="difficulty-input recipe-form-input">
					<FormLabel component="legend">Difficulty</FormLabel>
					<div className="radio-group-options">
						<div className="radio-button-option">
							<RadioButton color='primary' name="difficulty" value={Difficulty.EASY} onChange = { this.handleChange } checked= {this.state.recipe.difficulty === Difficulty.EASY} />
							<div className="radio-button-label">Easy</div>
						</div>
						<div className="radio-button-option">
							<RadioButton color='primary' name="difficulty" value={Difficulty.MEDIUM} onChange = { this.handleChange } checked={this.state.recipe.difficulty === Difficulty.MEDIUM} />
							<div className="radio-button-label">Medium</div>
						</div>
						<div className="radio-button-option">
							<RadioButton color='primary' name="difficulty" value={Difficulty.HARD} onChange = { this.handleChange } checked={this.state.recipe.difficulty === Difficulty.HARD} />
							<div className="radio-button-label">Hard</div>
						</div>
					</div>
				</div>
				<div className="food-type-input recipe-form-input">
					<FormLabel component="legend">Food Type</FormLabel>
					<div className="radio-group-options">
						<div className="radio-button-option">
							<RadioButton color='primary' name="foodType" value={FoodType.BREAKFAST} onChange = { this.handleChange } checked= {this.state.recipe.foodType === FoodType.BREAKFAST} />
							<div className="radio-button-label">Breakfast</div>
						</div>
						<div className="radio-button-option">
							<RadioButton color='primary' name="foodType" value={FoodType.LUNCH} onChange = { this.handleChange } checked={this.state.recipe.foodType === FoodType.LUNCH} />
							<div className="radio-button-label">Lunch</div>
						</div>
						<div className="radio-button-option">
							<RadioButton color='primary' name="foodType" value={FoodType.DINNER} onChange = { this.handleChange } checked={this.state.recipe.foodType === FoodType.DINNER} />
							<div className="radio-button-label">Dinner</div>
						</div>
						<div className="radio-button-option">
							<RadioButton color='primary' name="foodType" value={FoodType.SNACK} onChange = { this.handleChange } checked={this.state.recipe.foodType === FoodType.SNACK} />
							<div className="radio-button-label">Snack</div>
						</div>
						<div className="radio-button-option">
							<RadioButton color='primary' name="foodType" value={FoodType.DESSERT} onChange = { this.handleChange } checked={this.state.recipe.foodType === FoodType.DESSERT} />
							<div className="radio-button-label">Dessert</div>
						</div>
					</div>
				</div>
				<div className="time-and-cuisine">
					<div className="time-input recipe-form-input text-input">
						<FormLabel component="legend">Time Needed (Minutes)</FormLabel>
						<TextValidator className="recipe-input-text-box"
													validators={['required', 'isNumber', 'minNumber:1']}
													errorMessages={['Required', 'Must be a number', 'Time must be at least 1 minute']}
													name="time"
													onChange = { this.handleChange }
													value={this.state.recipe.time}
													fullWidth
													variant="outlined"
													InputProps={{
      					            classes: {
      					              root: classes.cssOutlinedInput,
      					              focused: classes.cssFocused,
      					              notchedOutline: classes.notchedOutline,
      					            }
      					          }}/>
					</div>
					<div className="cuisine-input recipe-form-input text-input">
						<FormLabel component="legend">Cuisine</FormLabel>
						<TextValidator className="recipe-input-text-box"
													validators={['required']}
													errorMessages={['Required']}
													name="cuisine"
													onChange={ this.handleChange }
													value = { this.state.recipe.cuisine }
													fullWidth
													variant="outlined"
													InputProps={{
      					            classes: {
      					              root: classes.cssOutlinedInput,
      					              focused: classes.cssFocused,
      					              notchedOutline: classes.notchedOutline,
      					            }
      					          }}/>
					</div>
				</div>
				<div className="imgUrl-input recipe-form-input text-input">
					<FormLabel component="legend">Image URL</FormLabel>
					<TextValidator className="recipe-input-text-box"
												name="imgUrl"
												validators={['matchRegexp:(http)?s?:?(\/\/[^"\']*\/.+\.(?:png|jpg|jpeg|gif|png|bmp))$'] }
												errorMessages={['Enter valid image URL']}
												placeholder='Accepted extensions:  .gif, .png, .bmp, .jpg, .jpeg'
												onChange = {this.handleChange}
												value = {this.state.recipe.imgUrl === NO_IMAGE_URL? '' : this.state.recipe.imgUrl }
												fullWidth
												variant="outlined"
												InputProps={{
      				            classes: {
      				              root: classes.cssOutlinedInput,
      				              focused: classes.cssFocused,
      				              notchedOutline: classes.notchedOutline,
      				            }
      				          }}/>
				</div>
				<div className="ingredients-input recipe-form-input">
					<FormLabel component="legend">Ingredients</FormLabel>
					<div className="input-container">
						<IngredientInputs ingredients={this.state.recipe.ingredients} handleChange = {this.handleChange} addNewIngredient={this.addNewIngredient} removeIngredient={this.removeIngredient}/>
						<Button type='button' color='primary' onClick={this.addNewIngredient}>+ Add Ingredient</Button>
					</div>
				</div>
				<div className="instructions-input recipe-form-input">
					<FormLabel component="legend">Procedure</FormLabel>
					<div className="input-container">
						<StepsInput procedure = {this.state.recipe.procedure} handleChange = {this.handleChange} removeStep = {this.removeStep}/>
						<Button type='button' color='primary' onClick={this.addNewStep}>+ Add Step</Button>
					</div>
				</div>
				<Button type="submit" className="bt_submit">Submit</Button>
			</ValidatorForm>
			:
			<div>
			<p>Are you sure you want to close? All changes will be lost!</p>
			<Button onClick={this.closeDialog}>Yes</Button> <Button onClick={this.props.cancelCloseDialog}>No</Button>
			</div>
		}
			</div>
			)
	}
}

export default withStyles(styles)(RecipeForm);
