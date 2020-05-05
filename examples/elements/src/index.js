import React, { Component, createRef } from 'react';
import { render, Box, Entry, Button } from '@react-gtk/binding';

class Example extends Component {
  constructor(props) {
    super(props);
    this.entry = createRef();
  }

  render() {
    return (
      <Box>
        <>Hello, world!</>
        <Button label="Click Me!" />
        <Entry ref={this.entry}>Hello</Entry>
      </Box>
    );
  }
}

render(<Example />, 'Entry');
