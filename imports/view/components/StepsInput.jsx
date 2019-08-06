import React from 'react';
import {TextValidator} from 'react-material-ui-form-validator';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import '../style/RecipeForm.css';

class StepsInput extends React.Component {

	render() {
		let procedure = this.props.procedure;


		return (
			procedure.map((step, index) => {
				let stepId = "stp_" + index;
				let btnId= "btn_stp_del_" + index;

				return (
					<div key={index} className="single-procedure-step">
						<div className="procedure-label">
							{index + 1}.
						</div>
						<TextValidator multiline
													fullWidth
													validators={['required']}
													errorMessages={['Required']}
													key={stepId}
													name={stepId}
													onChange={ this.props.handleChange }
													value={step} />
						{index > 0 ?
							<Tooltip title="Delete Step">
									<Icon className="icon-delete" onClick={() => this.props.removeStep(index)} key={btnId} name={btnId}>close</Icon>
							</Tooltip>:
							null}
					</div>
				)
			})
			);
	}
}

export default StepsInput;
