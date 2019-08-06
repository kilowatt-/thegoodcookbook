import React from 'react';
import {UOM} from '../../model/UnitOfMeasurement.js';
import MenuItem from '@material-ui/core/MenuItem';
import {TextValidator} from 'react-material-ui-form-validator';
import '../style/RecipeForm.css';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';

class IngredientInputs extends React.Component {

	constructor(props) {
		super(props);

		this.removeIngredient = this.removeIngredient.bind(this);
	}

	removeIngredient(id) {
		this.props.removeIngredient(id);
	}

	renderMenuItems() {

		let keys = Object.keys(UOM);
		let values = Object.values(UOM);

		return (
				keys.map((uom, index) => {

					let menuKey = uom;
					return (

						<MenuItem key={uom} value={values[index]}>{values[index]}</MenuItem>

						)
				}
			));

	}

	render() {

		let ingredients = this.props.ingredients;

		return (


			ingredients.map((ingredient,index) => {
				let ingredientId = 'ing_' + index;
				let uomId = 'uom_' + index;
				let qtyId = 'qty_' + index;
				let btnId = 'btn_' + index;

				return (
				<div key={index} className="single-ingredient">
					<div className="amount-input">
						<TextValidator className="ingredient-amount-input"
													validators={['required', 'gtZero']}
													errorMessages={['Required', 'Must be greater than zero']}
													key={qtyId}
													name={qtyId}
													onChange={this.props.handleChange}
													value={ingredient.quantity}/>
						<TextField key={uomId}
										select
										name={uomId}
										className="ingredient-amount-select"
										onChange={ this.props.handleChange }
										value={ingredient.ingredient.uom}
										variant="outlined">
										{this.renderMenuItems()}
										</TextField>
					</div>
					<TextValidator validators={['required']}
												errorMessages={['Required']}
												className="ingredient-name-input"
												key={ingredientId}
												name={ingredientId}
												onChange={ this.props.handleChange }
												value={ingredient.ingredient.name}
												fullWidth />
					{index > 0 ?
						<Tooltip title="Delete Ingredient">
								<Icon className="icon-delete" onClick={() => this.removeIngredient(index)} key={btnId} name={btnId}>close</Icon>
						</Tooltip>:
						null}
				</div>
				)
			})
			)
	}
}

export default IngredientInputs;
