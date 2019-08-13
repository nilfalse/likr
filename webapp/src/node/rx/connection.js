import { defer, from, fromEvent, of, ReplaySubject, throwError } from 'rxjs';
import {
  concat,
  delay,
  multicast,
  refCount,
  retryWhen,
  switchMap,
  switchMapTo,
  take,
  finalize,
} from 'rxjs/operators';

import { l } from '~/node/logger';
import { clientFactory } from '~/node/db';

export const persistent$ = defer(() => {
  const client = clientFactory();
  let errorCode = null;
  return from(client.connect()).pipe(
    switchMap(() => {
      l.trace('persistent db connection establised');
      return of(client);
    }),

    concat(
      fromEvent(client, 'error').pipe(
        switchMap(err => {
          l.error(err, 'persistent db connection error');
          errorCode = err.code;
          return throwError(err);
        })
      )
    ),
    finalize(() => {
      l.trace('persistent db connection dropped');
      if (errorCode !== 'ECONNRESET') {
        client.end();
      }
    })
  );
}).pipe(
  retryWhen(error$ => error$.pipe(
    delay(2000),
    take(5),
    concat(error$.pipe(
      switchMap(throwError)
    ))
  )),
  multicast(() => new ReplaySubject(1)),
  refCount()
);
