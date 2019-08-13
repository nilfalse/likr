import { v4 } from 'uuid';
import * as cookie from 'cookie';
import * as shortid from 'shortid';

import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import { App } from '~/components/App';
import { Layout } from '~/components/pages/Layout';
import { l } from '~/node/logger';
import { provideStore } from '~/store/server';

export const render = async (req, res) => {
  const routerContext = {
    cookies: cookie.parse(req.headers.cookie || ''),
    promises: []
  };
  const render = () => provideStore(
    <StaticRouter location={req.url} context={routerContext}>
      <App />
    </StaticRouter>
  );

  const app = ReactDOMServer.renderToString(render());
  await Promise.all(routerContext.promises);

  res.setHeader('Set-Cookie', [
    cookie.serialize('uid', routerContext.cookies.uid || shortid.generate(), {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    }),
    cookie.serialize('secret', routerContext.cookies.secret || v4(), {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    })
  ]);

  if (routerContext.response) {
    const { response } = routerContext;
    res.writeHead(response.status, response.headers);
  }
  ReactDOMServer.renderToStaticNodeStream(
    <Layout html={app} reqid={req.id} />
  ).pipe(res).on('finish', () => {
    l.debug({ req_id: req.id, res }, 'React rendered');
  });
};
