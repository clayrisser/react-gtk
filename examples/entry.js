import React, { Component, createRef } from 'react';
import { render, Entry } from '../src';

class Example extends Component {
  constructor(props) {
    super(props);
    this.entry = createRef();
  }

  render() {
    return <Entry ref={this.entry}>Hello</Entry>;
  }
}

render(<Example />);
