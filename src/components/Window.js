import React, { Component } from 'react';

const GtkWindow = 'GtkWindow';

export default class Window extends Component {
  render() {
    return <GtkWindow {...this.props} />;
  }
}
