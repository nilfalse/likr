import { combineEpics, ofType } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';

import { config } from '~/node/config';
import { notifyError } from '~/ducks/notifications';

import { roomsEpic } from './rooms';

export const DIE = Symbol('@@EPICS/COMPLETE');

const combinedEpics = combineEpics(
  roomsEpic
);

export const rootEpic = (action$, state$, deps) => combinedEpics(action$, state$, deps).pipe(
  takeUntil(action$.pipe(
    ofType(DIE)
  )),
  catchError((err, caught) => {
    deps.logger.error({ err }, 'Unexpected error encountered inside an epic');

    const defaultMessage = 'Something went wrong.\nPlease, try again later.';
    return concat(
      from(deps.send(notifyError(
        config.mode === 'production' ? defaultMessage : String(err)
      ))),
      caught
    );
  })
);
