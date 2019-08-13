import { ofType } from 'redux-observable';
import { from, of, throwError, concat } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  map,
  mergeMap,
  startWith,
  switchMap,
  takeUntil,
  withLatestFrom
} from 'rxjs/operators';

import { RoomsRepo, RoomsSpec } from '~/node/domain/Rooms';
import { FactsRepo, FactsSpec } from '~/node/domain/Facts';
import { RoomAggregateUnitOfWork } from '~/node/domain/UnitsOfWork';

import { notifyError } from '~/ducks/notifications';
import { fastForward, selectLastActionId } from '~/ducks/room';
import { SUBSCRIBE, UNSUBSCRIBE } from '~/ducks/room';

import { liveFactsFor } from '../../facts';

export const subscribeToRoomEpic = (action$, state$, { logger, send }) => action$.pipe(
  ofType(SUBSCRIBE),
  distinctUntilChanged((p, q) => p.payload.roomId === q.payload.roomId),
  switchMap(action => {
    const { roomId } = action.payload;

    return concat(
      from(new RoomAggregateUnitOfWork({ logger }).perform(action)).pipe(
        map(fastForward)
      ),
      liveFactsFor(roomId).pipe(
        withLatestFrom(state$),
        mergeMap(([ roomId, state ]) => {
          const factsRepo = new FactsRepo({ logger });
          const factsSpec = FactsSpec.byRoom({
            roomId,
            lastActionId: selectLastActionId(state),
          });

          return from(factsRepo.query(factsSpec)).pipe(
            mergeMap(facts => from(facts)),
            map(({ type, payload, meta }) => ({ type, payload, meta }))
          );
        })
      )
    ).pipe(
      takeUntil(action$.pipe(
        ofType(UNSUBSCRIBE)
      )),
      catchError(err => {
        if (err.name === 'RoomNotFoundError') {
          // TODO render 404 page if room not found
          return of(notifyError('Room not found'));
        } else {
          return throwError(err);
        }
      }),
      mergeMap(action => from(send(action)))
    );
  })
);
