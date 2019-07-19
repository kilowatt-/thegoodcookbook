import React from 'react';
import UserProfileTab from './UserProfileTab.jsx';
import '../style/header.css'

class Header extends React.Component {
	render() {
		return(
			<header>
			<h1 className="title">The Good Cook Book</h1>
			<UserProfileTab />
			</header>
			)

	}
}

export default Header;
