import * as cookie from 'cookie';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { getType } from 'typesafe-actions';

import { cookiesActions } from '../ducks/session';

export const sessionEpic = action$ => action$.pipe(
  ofType(getType(cookiesActions.request)),
  mergeMap(action =>
    of(cookie.parse(action.payload)).pipe(
      map(cookiesActions.success)
    )
  )
);
