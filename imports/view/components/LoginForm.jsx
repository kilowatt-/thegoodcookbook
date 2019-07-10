import React from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import { Meteor } from 'meteor/meteor';
import '../style/Login.css';
import { withTracker } from 'meteor/react-meteor-data';
import RegistrationForm from './RegistrationForm';
import CommonDialog from './CommonDialog';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.openRegistrationForm = this.openRegistrationForm.bind(this);
		this.closeForm = this.closeForm.bind(this);

		this.logOut = this.logout.bind(this);

		this.state = {
			email: '',
			password: '',
			error: '',
			registering: false
		}
	}

	openRegistrationForm(event) {
		event.preventDefault();
		this.setState({
			registering: true
		});
	}

	closeForm() {
		this.setState({
			registering: false
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		Meteor.loginWithPassword(this.state.email, this.state.password, 
		(err) => {
			if (err) {
				this.setState({
					error: err.reason
				})
			}
			else {
				this.setState({
					email: '',
					password: '',
					error: '',
					registering: false
				})
			}
		})
	}

	logout(event) {
		event.preventDefault();

		Meteor.logout();
	}

	handleChange(event) {
		event.preventDefault();

		this.setState ({
			[event.target.name]: event.target.value
		})
	}

	handleChange(event) {
		event.preventDefault();

		this.setState ({
			[event.target.name]: event.target.value
		})
	}

	render() {

		return (
			<div className="login">

			{this.props.user ? <span>Hello, {Meteor.user().name}! (<a href="#" onClick={this.logout}>Logout</a>)  </span> :

			<div>

			<ValidatorForm onSubmit={this.handleSubmit}>
				<TextValidator className="tf_email" validators={['required'], ['isEmail']} errorMessages={['Required'], ['Enter a valid email']} id="email" name="email"  value={this.state.email} onChange={this.handleChange} variant="filled" label="Email" />
				<TextValidator className="tf_password" validators={['required']} errorMessages={['Required']} id="password" name="password"  value={this.state.password} type='password' onChange={this.handleChange} variant="filled" label="Password" />
				<Button type="submit" className="bt_login">Login</Button><br />
				<a href="#" onClick={this.openRegistrationForm}>Register</a> <span id="login_error_msg">{this.state.error}</span>
			</ValidatorForm>

			<CommonDialog dialogOpen = { this.state.registering } dialogTitle='Register' closeDialog={this.closeForm} dialogContent= 
			{<RegistrationForm />}/>
			</div>
			}
			</div>
			);
	}
}


export default withTracker(() => {
	return {
		user: Meteor.user()
	}
})(LoginForm);