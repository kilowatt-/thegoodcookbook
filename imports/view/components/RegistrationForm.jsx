import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Meteor } from 'meteor/meteor';

class RegistrationForm extends React.Component {

	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.state = {
			name: '',
			password: '',
			email: '',
			error: ''
		}
	}

	handleSubmit(event) {
		event.preventDefault();

		let user = {
			email: this.state.email,
			password: this.state.password,
			name: this.state.name
		}

		console.log(user);

		Meteor.call('createUser', user, (err) => {
			if (err) {
				this.setState ({
					error: err.reason
				})
			}

			else {
				Meteor.loginWithPassword(this.state.email, this.state.password);
				this.props.callback();
			}
		})
	}

	handleChange(event) {
		event.preventDefault();

		this.setState ({
			[event.target.name]: event.target.value
		});
	}

	render() {
		return (
			<div>
			<ValidatorForm onSubmit={this.handleSubmit}>
				<TextValidator className="tf_name" validators={['required']} errorMessages={['Required']} id="name" name="name"  value={this.state.name} onChange={this.handleChange} fullWidth label="Name" /><br />
				<TextValidator className="tf_email" validators={['required', 'isEmail']} errorMessages={['Required', 'Valid email address required']} id="email" name="email" value={this.state.email} onChange={this.handleChange} fullWidth label="Email" /><br />
				<TextValidator className="tf_password" validators={['required']} errorMessages={['Required']} id="password" name="password"  value={this.state.password} type='password' onChange={this.handleChange} fullWidth label="Password" />
				<Button type="submit" className="bt_login">Submit</Button><br />
				<span style={{color:"red"}}>{this.state.error}</span>
			</ValidatorForm>
			</div>
			);
	}
}

export default RegistrationForm;