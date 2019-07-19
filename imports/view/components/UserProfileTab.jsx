import React from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import { Meteor } from 'meteor/meteor';
import '../style/Login.css';
import { withTracker } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { compose } from 'redux';
import RegistrationForm from './RegistrationForm';
import CommonDialog from './CommonDialog';
import LoginForm from './LoginForm';
import Icon from '@material-ui/core/Icon';
import {openLoginDialog, closeLoginDialog, openSignupDialog, closeSignupDialog} from '../../controller/actions/user.js';

class UserProfileTab extends React.Component {

	constructor(props) {
		super(props);
		this.openRegistrationForm = this.openRegistrationForm.bind(this);
		this.openLoginForm = this.openLoginForm.bind(this);
		this.closeRegistrationForm = this.closeRegistrationForm.bind(this);
		this.closeLoginForm = this.closeLoginForm.bind(this);
		this.logout = this.logout.bind(this);
	}

	openRegistrationForm(event) {
		event.preventDefault();
		this.props.openSignupDialog();
	}

	openLoginForm(event) {
		event.preventDefault();
		this.props.openLoginDialog();
	}

	closeRegistrationForm() {
		event.preventDefault();
		this.props.closeSignupDialog();
	}

	closeLoginForm() {
		event.preventDefault();
		this.props.closeLoginDialog();
	}

	logout(event) {
    event.preventDefault();
    Meteor.logout();
  }

	render() {

		return (
			<div className="login">
				{this.props.user ?
					<div>
						<Icon>person</Icon>
					 {Meteor.user().name} (<a href="#" onClick={this.logout}>Logout</a>)
					</div> :
					<div className="login-signup">
						<Button onClick={this.openLoginForm}>Login</Button>
						<Button onClick={this.openRegistrationForm}>Sign Up</Button>
						<CommonDialog closeDialog={this.closeRegistrationForm} dialogOpen={this.props.signupDialogOpen} dialogTitle='Sign Up' dialogContent= {<RegistrationForm />}/>
						<CommonDialog closeDialog={this.closeLoginForm} dialogOpen = { this.props.loginDialogOpen } dialogTitle='Log In' dialogContent= {<LoginForm />}/>
					</div>
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loginDialogOpen: state.loginDialogOpened,
		signupDialogOpen: state.signupDialogOpened
	}
}


export default compose(
	withTracker(() => {
		return {
			user: Meteor.user()
		};
}), connect(mapStateToProps, { openLoginDialog, closeLoginDialog, openSignupDialog, closeSignupDialog }))(UserProfileTab);
