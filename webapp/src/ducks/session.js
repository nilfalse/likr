import { get } from 'lodash';
import { createAsyncAction, getType } from 'typesafe-actions';

export const cookiesActions = createAsyncAction(
       '@Session/COOKIES/REQUEST',
Symbol('@Session/COOKIES/SUCCESS'),
       '@Session/COOKIES/FAILURE'
)();

const initialState = {
  uid: null,
  secret: null,
};

export const selectUid = (state) => {
  return get(state, 'session.uid', initialState.uid);
}

export const selectSecret = (state) => {
  return get(state, 'session.secret', initialState.secret);
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
  case getType(cookiesActions.success):
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
};
