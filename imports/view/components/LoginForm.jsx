import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Meteor } from 'meteor/meteor';
import { closeLoginDialog } from '../../controller/actions/user.js';
import { connect } from 'react-redux';
import Icon from '@material-ui/core/Icon';
import FormLabel from '@material-ui/core/FormLabel';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: '',
      password: '',
      error: ''
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    Meteor.loginWithPassword(this.state.email, this.state.password,
    (err) => {
      if (err) {
        this.setState({
          error: err.reason
        })
      }
      else {
        this.setState({
          email: '',
          password: '',
          error: ''
        });
        this.props.closeLoginDialog();
      }
    })
  }

  handleChange(event) {
    event.preventDefault();

    this.setState ({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div className="account-form-container">
        <Icon className="account-icon">account_circle</Icon>
        <ValidatorForm className="login-form" onSubmit={this.handleSubmit}>
          <div className="account-input">
            <FormLabel component="legend">Email</FormLabel>
            <TextValidator className="tf_email" validators={['required', 'isEmail']} errorMessages={['Required', 'Enter a valid email']} id="email" name="email"  value={this.state.email} onChange={this.handleChange} fullWidth variant="outlined"/>
          </div>
          <div className="account-input">
            <FormLabel component="legend">Password</FormLabel>
            <TextValidator className="tf_password" validators={['required']} errorMessages={['Required']} id="password" name="password"  value={this.state.password} type='password' onChange={this.handleChange} fullWidth variant="outlined" />
          </div>
          <Button type="submit" className="bt_login">Log In</Button><br />
          <span style={{color:"red"}}>{this.state.error}</span>
        </ValidatorForm>
      </div>
    );
  }
}

export default connect(null, { closeLoginDialog })(LoginForm);
