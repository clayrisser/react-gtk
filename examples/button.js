import React, { Component } from 'react';
import { render, Button } from '../src';

class Example extends Component {
  render() {
    return <Button label="Hello, world!" />;
  }
}

render(<Example />);
