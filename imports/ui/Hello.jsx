import React, { Component } from 'react';
import Button from '@material-ui/core/Button';


export default class Hello extends Component {
  state = {
    counter: 0,
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  render() {
    return (
      <div>
        <Button onClick={() => this.increment()}>Click Me</Button>
        <p>You've pressed the button {this.state.counter} times.</p>
      </div>
    );
  }
}
