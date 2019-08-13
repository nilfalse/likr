import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  mergeMap,
  withLatestFrom
} from 'rxjs/operators';
import { getType } from 'typesafe-actions';

import { CreateRoomUnitOfWork } from '~/node/domain/UnitsOfWork';

import { createRoomActions } from '~/ducks/rooms';
import { selectUid } from '~/ducks/session';

export const createRoomEpic = (action$, state$, { logger, send }) => action$.pipe(
  ofType(getType(createRoomActions.request)),
  withLatestFrom(state$),
  exhaustMap(([ action, state ]) =>
    from(new CreateRoomUnitOfWork({ logger }).perform(action, state))
  ),
  catchError(() => of(createRoomActions.failure({
    message: 'Could not create the room. Please, try again later.'
  }))),
  mergeMap(fact => from(send(fact)))
);
