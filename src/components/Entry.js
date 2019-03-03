import React, { Component } from 'react';

const GtkEntry = 'GtkEntry';

export default class Entry extends Component {
  render() {
    return <GtkEntry {...this.props} />;
  }
}
