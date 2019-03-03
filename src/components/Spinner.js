import React, { Component } from 'react';

const GtkSpinner = 'GtkSpinner';

export default class Spinner extends Component {
  render() {
    return <GtkSpinner {...this.props} />;
  }
}
