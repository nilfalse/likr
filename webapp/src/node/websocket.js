import { URL } from 'url';
import * as util from 'util';

import * as cookie from 'cookie';
import { isFSA } from 'flux-standard-action';
import * as WebSocket from 'ws';

import { l } from './logger';
import { Relay } from './domain/Relay';

export function attachWebsocket (server) {
  const wss = new WebSocket.Server({ server, verifyClient });

  function verifyClient ({ origin, req, secure }, cb) {
    req['relayStoreVerification'] = cookie.parse(req.headers['cookie']);
    cb(true);
  }

  wss.on('connection', (websocket, httpReq) => {
    const url = new URL(httpReq.url, 'http://127.0.0.1/')
    const logger = l.child({
      req_id: url.searchParams.get('reqid') || httpReq.headers['sec-websocket-key']
    });
    logger.info({ req: httpReq }, 'Websocket established');

    const relay = new Relay({
      logger,
      cookies: httpReq['relayStoreVerification'],
      send: util.promisify(websocket.send).bind(websocket),
    });

    websocket.on('message', (message) => {
      let json = undefined;
      try {
        json = JSON.parse(message);
      } catch (ignore) {}
  
      if (json !== undefined && isFSA(json)) {
        relay.dispatch(json);
      } else {
        logger.warn({ message, json }, 'unrecognized websocket message');
      }
    });

    websocket.on('close', (code, reason) => {
      logger.info({ code, reason }, 'Websocket dropped');
      relay.dispose();
    });

    health(websocket);
  });

  setInterval(() => wss.clients.forEach(heartbeat), 30000);

  return wss;
}

function health (websocket) {
  websocket.isAlive = true;
  websocket.on('pong', () => {
    websocket.isAlive = true;
  });
}

function heartbeat (websocket) {
  if (websocket.isAlive === false) {
    websocket.terminate();
    return;
  }

  websocket.isAlive = false;
  websocket.ping(noop);
}

const noop = new Function();
