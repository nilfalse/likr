import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Room } from './Room';

import { subscribeToRoom } from '../ducks/room';

export const RoomContainer = connect(
  (state, ownProps) => ({
    roomId: ownProps.match.params.rid,
  }),
  dispatch => bindActionCreators({
    subscribeToRoom,
  }, dispatch)
)(Room);
