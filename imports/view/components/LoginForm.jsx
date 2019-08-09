import React from "react";
import Button from "@material-ui/core/Button";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {Meteor} from "meteor/meteor";
import {closeLoginDialog} from "../../controller/actions/user.js";
import {connect} from "react-redux";
import Icon from "@material-ui/core/Icon";
import FormLabel from "@material-ui/core/FormLabel";
import {goHome} from "../../controller/actions/navBar.js";
import {compose} from "redux";
import {withStyles} from "@material-ui/core/styles";

const styles = {
    cssOutlinedInput: {
        "&$cssFocused $notchedOutline": {
            borderColor: "#d9cebf"
        },
    },
    notchedOutline: {},
    cssFocused: {},
};

class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            email: "",
            password: "",
            error: "",
            loggingIn: false
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            loggingIn: true,
            error: ""
        });

        Meteor.loginWithPassword(this.state.email, this.state.password,
            (err) => {
                if (err) {
                    this.setState({
                        error: err.reason,
                        loggingIn: false
                    })
                } else {
                    this.setState({
                        email: "",
                        password: "",
                        error: "",
                        loggingIn: false
                    });
                    this.props.closeLoginDialog();
                    this.props.goHome();
                }
            })
    }

    handleChange(event) {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                {
                    this.state.loggingIn ?
                        <div className="login-text-and-spinner">
                            <div className="log-in-text">Logging In</div>
                            <div className="login-spinner">
                                <div className="bounce1"></div>
                                <div className="bounce2"></div>
                                <div className="bounce3"></div>
                            </div>
                        </div>
                        :
                        <div className="account-form-container">
                            <Icon className="account-icon">account_circle</Icon>
                            <ValidatorForm className="login-form" onSubmit={this.handleSubmit}>
                                <div className="account-input">
                                    <FormLabel component="legend">Email</FormLabel>
                                    <TextValidator disabled={this.state.loggingIn}
                                                   className="tf_email"
                                                   validators={["required", "isEmail"]}
                                                   errorMessages={["Required", "Enter a valid email"]}
                                                   id="email"
                                                   name="email"
                                                   value={this.state.email}
                                                   onChange={this.handleChange}
                                                   fullWidth
                                                   variant="outlined"
                                                   InputProps={{
                                                       classes: {
                                                           root: classes.cssOutlinedInput,
                                                           focused: classes.cssFocused,
                                                           notchedOutline: classes.notchedOutline,
                                                       }
                                                   }}/>
                                </div>
                                <div className="account-input">
                                    <FormLabel component="legend">Password</FormLabel>
                                    <TextValidator disabled={this.state.loggingIn}
                                                   className="tf_password"
                                                   validators={["required"]}
                                                   errorMessages={["Required"]}
                                                   id="password"
                                                   name="password"
                                                   value={this.state.password}
                                                   type='password'
                                                   onChange={this.handleChange}
                                                   fullWidth
                                                   variant="outlined"
                                                   InputProps={{
                                                       classes: {
                                                           root: classes.cssOutlinedInput,
                                                           focused: classes.cssFocused,
                                                           notchedOutline: classes.notchedOutline,
                                                       }
                                                   }}/>
                                </div>
                                <Button disabled={this.state.loggingIn} type="submit" className="bt_login">Log
                                    In</Button><br/>
                                <span style={{color: "red"}}>{this.state.error}</span>
                                <span>{this.state.loggingIn ? "Logging in..." : null}</span>
                            </ValidatorForm>
                        </div>
                }
            </div>
        );
    }
}

export default compose(withStyles(styles), connect(null, {closeLoginDialog, goHome}))(LoginForm);
