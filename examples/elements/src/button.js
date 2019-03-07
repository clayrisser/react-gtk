import React, { Component, createRef } from 'react';
import { render, Button, Box } from '@react-gtk/binding';

class Example extends Component {
  constructor(props) {
    super(props);
    this.root = createRef();
  }

  render() {
    return (
      <Box ref={this.root}>
        <Button label="One" />
        <Button label="Two" />
      </Box>
    );
  }
}

render(<Example />, 'Button');
