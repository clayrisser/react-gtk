import React, { Component } from 'react';
import { render, Entry } from '../src';

class Example extends Component {
  render() {
    return <Entry>Hello</Entry>;
  }
}

render(<Example />);
