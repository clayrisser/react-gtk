import React, { Component, createRef } from 'react';
import { render, Button } from '@react-gtk/binding';

class Example extends Component {
  constructor(props) {
    super(props);
    this.button = createRef();
  }

  render() {
    return <Button ref={this.button} label="Hello, world!" />;
  }
}

render(<Example />, 'Button');
