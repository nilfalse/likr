const META = 'META';

export const selectIsOnline = (state) => state.meta.status === 'online';

export const meta = (payload) => ({
  type: META,
  payload,
});

const initialState = {
  status: 'offline',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
  case META:
    return {
      ...state,
      ...action.payload,
    };
  case '@@websocket/OPEN':
    return {
      ...state,
      status: 'online',
    };
  case '@@websocket/CLOSE':
    return {
      ...state,
      status: 'offline',
    };
  default:
    return state;
  }
};
