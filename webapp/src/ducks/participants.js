const JOIN = 'Participants/JOIN';
const READY = 'Participants/READY';
const LEAVE = 'Participants/LEAVE';

export const join = (participant) => ({
  type: JOIN,
  payload: participant,
  meta: { send: true },
});

export const ready = (participant) => ({
  type: READY,
  payload: participant,
});

export const leave = (id) => ({
  type: LEAVE,
  payload: id,
});

const initialState = {
  byId: {},
  count: 0
};

export function reducer (state = initialState, action) {
  switch (action.type) {
  case JOIN: {
    const participant = action.payload;
    const byId = {
      ...state.byId,
      [participant.id]: {
        ...participant,
        status: 'joined'
      }
    };
    return {
      ...state,
      byId
    };
  }
  case READY: {
    const id = action.payload;
    const byId = {
      ...state.byId,
      [id]: {
        ...state.byId[id],
        ...participant,
        status: 'ready'
      }
    };
    return {
      ...state,
      byId
    };
  }
  case LEAVE: {
    const id = action.payload;
    const byId = {
      ...state.byId,
      [id]: {
        ...state.byId[id],
        status: 'left'
      }
    };
    return {
      ...state,
      byId
    };
  }
  default:
    return state;
  }
}

const omit = (obj, key) => {
  return Object.keys(obj).reduce((rv, k) => {
    if (k !== key) {
      rv[k] = obj[k];
    }
    return rv;
  }, {});
};
