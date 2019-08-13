import { createBrowserHistory } from 'history';
import * as React from 'react';
import { Provider } from 'react-redux';
import ReduxWebSocketBridge from 'redux-websocket-bridge';
import { getType } from 'typesafe-actions';

import { reducer as notifications } from '~/ducks/notifications';
import { createRoomActions, reducer as rooms } from '~/ducks/rooms';
import { websocketFactory } from '~/web/websocket';
import { configureStore } from '.';

export const history = createBrowserHistory();

const redirectMiddleware = store => next => action => {
  const retVal = next(action);

  switch (action.type) {
  case getType(createRoomActions.success):
    history.push('/rooms/' + action.payload.id);
    break;
  }

  return retVal;
};

const store = configureStore({
  middlewares: [ ReduxWebSocketBridge(websocketFactory), redirectMiddleware ],
  reducers: { rooms, notifications },
});

export const provideStore = (children) => <Provider store={store}>{children}</Provider>;
