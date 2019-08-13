import * as http from 'http';

import * as shortid from 'shortid';
import * as finalhandler from 'finalhandler';
import * as serveStatic from 'serve-static';

import { staticPath } from './util/_assets';
import { attachWebsocket } from './websocket';

import { l } from './logger';
import { render } from './react';

let react;

if (module.hot) {
  let hotRender = render;
  module.hot.accept('./react.js', () => hotRender = render);

  // based on the https://github.com/expressjs/express/issues/2596#issuecomment-81353034
  react = (req, res) => hotRender(req, res);
} else {
  react = render;
}

const serve = serveStatic(staticPath, {
  maxage: '1y',
  immutable: true,
});

const server = http.createServer((req, res) => {
  req.id = shortid.generate();

  const logger = l.child({ req_id: req.id });
  logger.info({ req }, `${req.method} ${req.url} HTTP/${req.httpVersion}`);

  serve(req, res, (err) => {
    if (err) {
      const done = finalhandler(req, res);
      logger.warn({ res }, 'error while serving static file');
      done(err);
    } else {
      react(req, res);
    }
  });
});

if (module.hot) {
  let wss = attachWebsocket(server);

  module.hot.accept('./websocket.js', async () => {
    const WebsocketServer = await import('./websocket');
    wss.close();
    wss = WebsocketServer.attachWebsocket(server);
  });
} else {
  attachWebsocket(server);
}

export const app = {
  listen: server.listen.bind(server),
};
