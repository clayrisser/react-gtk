import React, { Component, createRef } from 'react';
import { render, Spinner } from '../src';

class Example extends Component {
  constructor(props) {
    super(props);
    this.spinner = createRef();
  }

  render() {
    return <Spinner ref={this.spinner} />;
  }
}

render(<Example />);
