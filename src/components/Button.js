import React, { Component } from 'react';

const GtkButton = 'GtkButton';

export default class Button extends Component {
  render() {
    return <GtkButton {...this.props} />;
  }
}
