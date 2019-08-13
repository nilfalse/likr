import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

import { reducer as meta } from '../ducks/meta';
import { reducer as participants } from '../ducks/participants';
import { reducer as room } from '../ducks/room';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const configureStore = ({
  middlewares = [],
  enhancers = [],
  reducers = {}
} = {}, preloadedState = undefined) => {
  const middlewareEnhancer = applyMiddleware(...[ ...middlewares ]);

  return createStore(
    combineReducers({
      ...reducers,
      meta,
      participants,
      room,
    }),
    preloadedState,
    composeEnhancers(...[...enhancers, middlewareEnhancer])
  );
};
