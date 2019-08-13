import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { RoomCreateForm } from './RoomCreateForm';

import { createRoom } from '../ducks/rooms';

export const RoomCreateFormContainer = connect(
  undefined,
  dispatch => bindActionCreators({
    createRoom,
  }, dispatch)
)(RoomCreateForm);
