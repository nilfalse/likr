import { ofType } from 'redux-observable';
import { from, throwError } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  startWith,
} from 'rxjs/operators';
import { getType } from 'typesafe-actions';

import { RoomsRepo, RoomsSpec } from '~/node/domain/Rooms';

import { listRoomsActions } from '~/ducks/rooms';

export const listRoomsEpic = (action$, state$, { logger, send }) => action$.pipe(
  ofType(getType(listRoomsActions.request)),
  mergeMap(action => {
    const rooms = new RoomsRepo({ logger }).query(
      RoomsSpec.latest(action.payload)
    );

    return from(rooms);
  }),
  map((roomList) => listRoomsActions.success({
    items: roomList.slice(0, RoomsRepo.perPage),
    hasMore: roomList.length > RoomsRepo.perPage,
  })),
  catchError(err => throwError(err).pipe(
    startWith(listRoomsActions.failure({
      message: 'Something went wrong. Please, try again later.',
    }))
  )),
  mergeMap(action => from(send(action)))
);
