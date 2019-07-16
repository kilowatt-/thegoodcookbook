import React from 'react';
import Button from '@material-ui/core/Button';
import { TextValidator} from 'react-material-ui-form-validator';

class StepsInput extends React.Component {
	constructor(props) {
		super();
	}

	render() {
		let procedure = this.props.procedure;


		return (
			procedure.map((step, index) => {
				let stepId = "stp_" + index;
				let btnId= "btn_stp_del_" + index

				return (
					<div key={index}>
						{index + 1}. <TextValidator multiline style={{width: 450}} validators={['required']} errorMessages={['Required']} key={stepId} name={stepId} onChange={ this.props.handleChange } value={step} />
						{index > 0 ? <Button color="secondary" key={btnId} name={btnId} onClick={() => this.props.removeStep(index)}>Delete</Button> : null}
					</div>
					)
			})
			);
	}
}

export default StepsInput;