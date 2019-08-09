import React from "react";
import UserProfileTab from "./UserProfileTab.jsx";
import "../style/header.css";
import NavBar from "./NavBar.jsx";
import {goHome} from "../../controller/actions/navBar.js";
import {connect} from "react-redux";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.goHome = this.goHome.bind(this);
    }

    goHome() {
        this.props.goHome();
    }

    render() {
        return (
            <div className="header-content">
                <div className="title-and-nav-bar">
                    <div className="title" onClick={this.goHome}>The Good Cook Book</div>
                    <NavBar/>
                </div>
                <UserProfileTab/>
            </div>
        )
    }
}

export default connect(null, {goHome})(Header);
