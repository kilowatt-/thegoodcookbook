import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Meteor } from 'meteor/meteor';
import { closeSignupDialog } from '../../controller/actions/user.js';
import { connect } from 'react-redux';

class RegistrationForm extends React.Component {

	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.state = {
			name: '',
			password: '',
			password_verify: '',
			email: '',
			error: '',
			signingUp: false
		}
	}

	componentDidMount() {
		ValidatorForm.addValidationRule('passwordsMatch', (value) => {
			return (value === this.state.password);
		})
	}


	componentWillUnmount() {
		ValidatorForm.removeValidationRule('passwordsMatch');
	}

	handleSubmit(event) {
		event.preventDefault();

		let user = {
			email: this.state.email,
			password: this.state.password,
			name: this.state.name
		};

		this.setState({
			signingUp: true,
			error: ''
		});

		Meteor.call('createUser', user, (err) => {
			if (err) {
				this.setState ({
					error: err.reason,
					signingUp: false
				})
			}

			else {

				Meteor.loginWithPassword(this.state.email, this.state.password);
				this.props.callback();
				this.props.closeSignupDialog();
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
				<TextValidator disabled={this.state.signingUp} className="tf_name" validators={['required']} errorMessages={['Required']} id="name" name="name"  value={this.state.name} onChange={this.handleChange} fullWidth label="Name" /><br />
				<TextValidator disabled={this.state.signingUp} className="tf_email" validators={['required', 'isEmail']} errorMessages={['Required', 'Valid email address required']} id="email" name="email" value={this.state.email} onChange={this.handleChange} fullWidth label="Email" /><br />
				<TextValidator disabled={this.state.signingUp} className="tf_password" validators={['required']} errorMessages={['Required']} id="password" name="password"  value={this.state.password} type='password' onChange={this.handleChange} fullWidth label="Password" />
				<TextValidator disabled={this.state.signingUp} className="tf_password_repeat" validators={['required', 'passwordsMatch']} errorMessages={['Required', 'Passwords must match']} id="password_verify" name="password_verify"  value={this.state.password_verify} type='password' onChange={this.handleChange} fullWidth label="Verify password" InputLabelProps={{
					shrink: true
				}} />
				<Button disabled={this.state.signingUp} type="submit" className="bt_login">Submit</Button><br />
				<span style={{color:"red"}}>{this.state.error}</span>
				<span>{this.state.signingUp ? "Signup in progress..." : null}</span>
			</ValidatorForm>
			</div>
			);
	}
}

export default connect(null, { closeSignupDialog })(RegistrationForm);
