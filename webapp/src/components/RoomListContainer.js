import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { RoomList } from './RoomList';

import { selectRooms, selectStatus, listRooms } from '../ducks/rooms';

export const RoomListContainer = connect(
  state => ({
    rooms: selectRooms(state),
    status: selectStatus(state),
  }),
  dispatch => bindActionCreators({
    listRooms,
  }, dispatch)
)(RoomList);
