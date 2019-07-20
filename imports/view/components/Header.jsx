import React from 'react';
import UserProfileTab from './UserProfileTab.jsx';
import '../style/header.css';
import NavBar from './NavBar.jsx';

class Header extends React.Component {
	render() {
		return(
			<header>
			<div className="title">The Good Cook Book</div>
			<NavBar />
			<UserProfileTab />
			</header>
			)
	}
}

export default Header;
