import React, { Component } from 'react';
import { render, Spinner } from '../src';

class Example extends Component {
  render() {
    return <Spinner />;
  }
}

render(<Example />);
