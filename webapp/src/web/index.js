import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import { history, provideStore } from '~/store/client';
import { App } from '~/components/App';

ReactDOM.hydrate(
  provideStore(
    <Router history={history}>
      <App />
    </Router>
  ),
  document.getElementById('react-root')
);
