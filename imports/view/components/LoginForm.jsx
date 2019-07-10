import React from 'react';
import Blaze from 'meteor/gadicc:blaze-react-component';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import { Meteor } from 'meteor/meteor';
import '../style/Login.css';
import { withTracker } from 'meteor/react-meteor-data';



class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.logOut = this.logout.bind(this);


		this.state = {
			username: '',
			password: '',
			error: ''
		}
	}

	handleSubmit(event) {
		event.preventDefault();

		Meteor.loginWithPassword(this.state.username, this.state.password, () => {
			this.setState({
				username: '',
				password: '',
				error: ''
			}) 
		}, (err) => {
			this.setState({
				error: err.reason
			})
		})
	}

	logout() {
		Meteor.logout();
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
			<Blaze template="loginButtons" />

		return (
			<div className="login">
			<Blaze template="loginButtons" />
			{this.props.user ? <span>Hello, {Meteor.user().name}! (<a href="#" onClick={this.logout}>Logout</a>)  </span> :

			<ValidatorForm onSubmit={this.handleSubmit}>
				<TextValidator className="tf_username" validators={['required']} errorMessages={['Required']} id="username" name="username"  value={this.state.username} onChange={this.handleChange} variant="filled" label="Username" />
				<TextValidator className="tf_password" validators={['required']} errorMessages={['Required']} id="password" name="password"  value={this.state.password} type='password' onChange={this.handleChange} variant="filled" label="Password" />
				<Button type="submit" className="bt_login">Login</Button><br />
				<span id="login_error_msg">{this.state.error}</span>
			</ValidatorForm>

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
