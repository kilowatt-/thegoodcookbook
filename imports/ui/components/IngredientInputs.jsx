import React from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const IngredientInputs = (props) => {
	let ingredients = props.ingredients;

	return (
		ingredients.map((ingredient,index) => {
			let ingredientId = 'ingredient' + index;
			let uomId = 'uom' + index;

			return (
			<div key={index}>
				<Input type="text" name={ingredientId} onChange={ props.handleChange } value={ingredients[index].name} />
			</div>
			)
			}
			)
		)
}

export default IngredientInputs;