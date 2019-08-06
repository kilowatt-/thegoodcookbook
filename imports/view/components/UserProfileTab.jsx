import React from 'react';
import Button from '@material-ui/core/Button';
import {Meteor} from 'meteor/meteor';
import '../style/Login.css';
import {withTracker} from 'meteor/react-meteor-data';
import {connect} from 'react-redux';
import {compose} from 'redux';
import RegistrationForm from './RegistrationForm';
import CommonDialog from './CommonDialog';
import LoginForm from './LoginForm';
import Icon from '@material-ui/core/Icon';
import {closeLoginDialog, closeSignupDialog, openLoginDialog, openSignupDialog} from '../../controller/actions/user.js';
import {browseAll} from '../../controller/actions/navBar.js';

class UserProfileTab extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loggingOut: false
		};

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
		this.setState({
			loggingOut: true
		});
		Meteor.logout( () => {
			this.setState({
				loggingOut: false
			});
			this.props.browseAll();
		}
		);

  	}

	render() {

		return (
			<div className="login">
				{Meteor.user() ?
					<div className="user-profile">
						<Icon>person</Icon>
						<div className="username">
							{Meteor.user().name}
							<div className="logout-button">
							{this.state.loggingOut ?
								<div className="logout-text">(Logging out...)</div>
								: <div className="logout-button-text" onClick={this.logout}>(Logout)</div>}</div>
						</div>
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
};


export default compose(
	withTracker(() => {
		return {
			user: Meteor.user()
		};
	}), connect(mapStateToProps, { openLoginDialog, closeLoginDialog, openSignupDialog, closeSignupDialog, browseAll }))(UserProfileTab);
