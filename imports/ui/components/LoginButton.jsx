import React from 'react';
import ReactDOM from 'react-dom';
import Blaze from 'meteor/gadicc:blaze-react-component';

class LoginButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Blaze template="loginButtons" />
			);
	}

}

export default LoginButton;