import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Meteor } from 'meteor/meteor';
import { closeLoginDialog } from '../../controller/actions/user.js';
import { connect } from 'react-redux';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: '',
      password: '',
      error: '',
      loggingIn: false
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      loggingIn: true,
      error: ''
    });

    Meteor.loginWithPassword(this.state.email, this.state.password,
    (err) => {
      if (err) {
        this.setState({
          error: err.reason,
          loggingIn: false
        })
      }
      else {
        this.setState({
          email: '',
          password: '',
          error: '',
          loggingIn: false
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
      <div>
        <ValidatorForm className="login-form" onSubmit={this.handleSubmit}>
          <TextValidator className="tf_email"  disabled={this.state.loggingIn} validators={['required', 'isEmail']} errorMessages={['Required', 'Enter a valid email']} id="email" name="email"  value={this.state.email} onChange={this.handleChange} variant="outlined" label="Email" />
          <TextValidator className="tf_password" disabled={this.state.loggingIn} validators={['required']} errorMessages={['Required']} id="password" name="password"  value={this.state.password} type='password' onChange={this.handleChange} variant="outlined" label="Password" />
          <Button type="submit" className="bt_login">Login</Button><br />
          <span style={{color:"red"}}>{this.state.error}</span>
          <span>{this.state.loggingIn ? "Logging in..." : null}</span>
        </ValidatorForm>
      </div>
    );
  }
}

export default connect(null, { closeLoginDialog })(LoginForm);
