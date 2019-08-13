import { from, fromEvent, merge, ReplaySubject } from 'rxjs';
import {
  filter,
  map,
  mergeMap,
  multicast,
  refCount,
  share,
  startWith,
  switchMap,
} from 'rxjs/operators';

import { l } from '~/node/logger';
import { notifyChannelName } from '~/node/domain/Facts/constants';

import { persistent$ } from './connection';

const LISTEN_QUERY = `LISTEN "${notifyChannelName}"`;

const listeningClient$ = persistent$.pipe(
  switchMap(client => from(client.query(LISTEN_QUERY)).pipe(
    map(() => client),
    multicast(() => new ReplaySubject(1)),
    refCount()
  ))
);

const facts$ = listeningClient$.pipe(
  mergeMap(client => fromEvent(client, 'notification')),
  share(),
  filter(({ channel }) => channel === notifyChannelName),
  // > Message {
  //   name: 'notification',
  //   length: 63,
  //   processId: 4613,
  //   channel: 'facts-channel',
  //   payload: 'ref:a2fba40b-7c65-4271-b543-313d88933d20' }
  map(({ payload }) => payload.substring('ref:'.length))
);

export function liveFactsFor (roomId) {
  return merge(
    listeningClient$.pipe(
      map(() => roomId)
    ),
    facts$.pipe(
      filter(ref => ref === roomId)
    )
  );
}
