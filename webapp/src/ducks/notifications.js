import { createAsyncAction, getType } from 'typesafe-actions';

const NOTIFY = 'Notifications/NOTIFY';
const DISMISS = 'Notifications/DISMISS';

export const notify = (payload) => {
  return {
    type: NOTIFY,
    payload,
  };
};

export const notifyError = (message) => {
  return notify({
    severity: 'ERROR',
    message,
  });
};

export const dismiss = (payload) => {
  return {
    type: DISMISS,
    payload,
  };
};

const initialState = [];

export const selectByIdx = (state, idx) => {
  return state[idx];
}

export const selectHasNotifications = (state) => {
  return state.length > 0;
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
  case NOTIFY: {
    const notification = {
      severity: 'INFO',
      ...action.payload,
      id: (state[state.length - 1] || { id: 0 }).id + 1,
    };
    return state.concat(notification);
  }
  case DISMISS:
    return state.filter((item) => item.id !== action.payload);
  default:
    return state;
  }
};
