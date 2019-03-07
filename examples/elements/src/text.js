import React, { Component, createRef } from 'react';
import { render } from '@react-gtk/binding';

class Example extends Component {
  constructor(props) {
    super(props);
    this.entry = createRef();
  }

  render() {
    return <>Hello</>;
  }
}

render(<Example />, 'Entry');
