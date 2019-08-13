import * as get from 'lodash/get';
import { createAsyncAction, getType } from 'typesafe-actions';

export const selectStatus = (state) => {
  return get(state, 'rooms.status', null);
};

export const selectRooms = (state) => {
  return get(state, 'rooms.items', []);
};

export const createRoomActions = createAsyncAction(
  'Rooms/CREATE/REQUEST',
  'Rooms/CREATE/SUCCESS',
  'Rooms/CREATE/FAILURE'
)();

export const listRoomsActions = createAsyncAction(
  'Rooms/LIST/REQUEST',
  'Rooms/LIST/SUCCESS',
  'Rooms/LIST/FAILURE'
)();

export const createRoom = (room) => ({
  type: getType(createRoomActions.request),
  payload: room,
  meta: { send: true },
});

export const listRooms = (payload = { page: 1 }) => ({
  type: getType(listRoomsActions.request),
  payload,
  meta: { send: true },
});

const initialState = {
  status: null,
  items: [],
  hasMore: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
  case getType(listRoomsActions.request):
    return {
      status: 'loading',
      items: state.items,
      hasMore: null,
    };
  case getType(listRoomsActions.success):
    return {
      ...action.payload,
      status: 'idle',
    };
  case getType(listRoomsActions.failure):
    return {
      ...state,
      status: 'idle',
    };

  case getType(createRoomActions.success):
    return {
      ...state,
      items: state.items.concat(action.payload),
    };

  default:
    return state;
  }
};
