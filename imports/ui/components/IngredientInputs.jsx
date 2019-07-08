import React from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import {UOM} from '../../model/UnitOfMeasurement.jsx';
import MenuItem from '@material-ui/core/MenuItem';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

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
				<div key={index}>
					<TextValidator validators={['required', 'isNumber']} errorMessages={['Required', 'Must be a number']} key={qtyId} name={qtyId} onChange={this.props.handleChange} value={ingredient.quantity} style={{width:30}} /> <TextValidator validators={['required']} errorMessages={['Required']} key={ingredientId} name={ingredientId} style={{width:150}} onChange={ this.props.handleChange } value={ingredient.ingredient.name} /> 
					<Select key={uomId} name={uomId} onChange={ this.props.handleChange } value={ingredient.ingredient.uom} style={{width:80}}>
					{this.renderMenuItems()}
					</Select>
					{index > 0 ? <Button color="secondary" key={btnId} name={btnId} onClick={() => this.removeIngredient(index)}>Delete</Button> : null}
				
				</div>
				)
				}
				)
			)
	}
}

export default IngredientInputs;