import * as React from 'react';
import { Component } from 'react';

export class Room extends Component {
  componentDidMount () {
    const { roomId } = this.props;
    this.props.subscribeToRoom({ roomId });
  }

  render () {
    return (
      null
    );
  }
}
