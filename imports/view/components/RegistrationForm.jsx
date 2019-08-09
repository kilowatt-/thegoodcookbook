import React from "react";
import Button from "@material-ui/core/Button";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {Meteor} from "meteor/meteor";
import {closeSignupDialog} from "../../controller/actions/user.js";
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

class RegistrationForm extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            name: "",
            password: "",
            password_verify: "",
            email: "",
            error: "",
            signingUp: false,
            loggingIn: false
        }
    }

    componentDidMount() {
        ValidatorForm.addValidationRule("passwordsMatch", (value) => {
            return (value === this.state.password && value === this.state.password_verify);
        })
    }

    componentWillUnmount() {
        ValidatorForm.removeValidationRule("passwordsMatch");
    }

    handleSubmit(event) {
        event.preventDefault();

        let user = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name
        };

        this.setState({
            signingUp: true,
            error: ""
        });

        Meteor.call("createUser", user, (err) => {
            if (err) {
                this.setState({
                    error: err.reason,
                    signingUp: false
                })
            } else {
                this.setState({
                    signingUp: false,
                    loggingIn: true
                });
                Meteor.loginWithPassword(this.state.email, this.state.password);
                this.props.callback();
                this.props.closeSignupDialog();
                this.props.goHome();
            }
        })
    }

    handleChange(event) {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <div> {
                this.state.loggingIn || this.state.signingUp ?
                    <div className="login-text-and-spinner">
                        <div className="log-in-text">{this.state.loggingIn ? "Logging In" : "Registering Account"}</div>
                        <div className="login-spinner">
                            <div className="bounce1"></div>
                            <div className="bounce2"></div>
                            <div className="bounce3"></div>
                        </div>
                    </div>
                    :
                    <div className="account-form-container">
                        <Icon className="account-icon">account_circle</Icon>
                        <ValidatorForm className="login-form"  instantValidate={false} onSubmit={this.handleSubmit}>
                            <div className="account-input">
                                <FormLabel component="legend">Name</FormLabel>
                                <TextValidator disabled={this.state.signingUp}
                                               className="tf_name"
                                               validators={["required"]}
                                               errorMessages={["Required"]}
                                               id="name"
                                               name="name"
                                               value={this.state.name}
                                               onChange={this.handleChange}
                                               fullWidth variant="outlined"
                                               InputProps={{
                                                   classes: {
                                                       root: classes.cssOutlinedInput,
                                                       focused: classes.cssFocused,
                                                       notchedOutline: classes.notchedOutline,
                                                   }
                                               }}/>
                            </div>
                            <div className="account-input">
                                <FormLabel component="legend">Email</FormLabel>
                                <TextValidator disabled={this.state.signingUp}
                                               className="tf_email"
                                               validators={["required", "isEmail"]}
                                               errorMessages={["Required", "Valid email address required"]}
                                               id="email" name="email"
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
                                <TextValidator disabled={this.state.signingUp}
                                               className="tf_password"
                                               validators={["required", "passwordsMatch"]}
                                               errorMessages={["Required", "Passwords must match"]}
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
                            <div className="account-input">
                                <FormLabel component="legend">Confirm Password</FormLabel>
                                <TextValidator disabled={this.state.signingUp}
                                               className="tf_password_match"
                                               validators={["required", "passwordsMatch"]}
                                               errorMessages={["Required", "Passwords must match"]}
                                               id="password_verify"
                                               name="password_verify"
                                               value={this.state.password_verify}
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
                            <Button disabled={this.state.signingUp} type="submit" className="bt_login">Sign
                                Up</Button><br/>
                            <span style={{color: "red"}}>{this.state.error}</span>
                            <span>{this.state.signingUp ? "Signup in progress..." : null}</span>
                        </ValidatorForm>
                    </div>
            }
            </div>
        );
    }
}

export default compose(withStyles(styles), connect(null, {closeSignupDialog, goHome}))(RegistrationForm);
