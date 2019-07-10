import React from 'react';
import LoginForm from './LoginForm.jsx';
import '../style/header.css'

class Header extends React.Component {
	render() {
		return(
			<header>
			<h1 className="title">The Good Cook Book</h1>
			<LoginForm />
			</header>
			)

	}
}

export default Header;