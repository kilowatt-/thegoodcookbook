import React from 'react';
import UserProfileTab from './UserProfileTab.jsx';
import '../style/header.css';
import NavBar from './NavBar.jsx';

class Header extends React.Component {
	render() {
		return(
			<div className="header-content">
				<div className="title-and-nav-bar">
					<div className="title">The Good Cook Book</div>
					<NavBar />
				</div>
				<UserProfileTab />
			</div>
			)
	}
}

export default Header;
