import { combineEpics } from 'redux-observable';

import { listRoomsEpic } from './list';
import { subscribeToRoomEpic } from './subscribe';
import { createRoomEpic } from './create';

export const roomsEpic = combineEpics(
  listRoomsEpic,
  subscribeToRoomEpic,
  createRoomEpic
);
