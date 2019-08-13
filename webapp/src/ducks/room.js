const DUCK_NAME = 'room';

export const SUBSCRIBE = 'Room/SUBSCRIBE';
export const UNSUBSCRIBE = 'Room/UNSUBSCRIBE';

const FAST_FORWARD = 'Room/FAST_FORWARD';
const LOAD_QUESTION = 'Room/LOAD_QUESTION';
const ANSWER = 'Room/ANSWER';

export const subscribeToRoom = ({ roomId }) => ({
  type: SUBSCRIBE,
  payload: {
    roomId,
  },
  meta: { send: true },
});

export const unsubscribeFromRoom = (room) => ({
  type: UNSUBSCRIBE,
  payload: room,
  meta: { send: true },
});

export const fastForward = (state) => {
  return {
    type: FAST_FORWARD,
    payload: state,
  };
};

export const newQuestion = (question) => {
  return {
    type: LOAD_QUESTION,
    payload: question
  };
};

export const answer = (payload) => {
  return {
    type: ANSWER,
    payload: payload
  };
};

const initialState = {
  id: null,
  lastActionId: null,
  status: null,
  currentQuestion: {
    id: null,
    answers: []
  },
  answers: []
};

export const selectRoomState = (state) => {
  return state[DUCK_NAME] || initialState;
};

export const selectLastActionId = (state) => {
  return selectRoomState(state).lastActionId;
};

export const reducer = (state = initialState, action) => {
  const { meta } = action;
  const lastActionId = (meta && typeof meta.factId === 'number')
    ? meta.factId
    : state.lastActionId || null;

  switch (action.type) {
  case FAST_FORWARD:
    return {
      ...action.payload,
    };
  case LOAD_QUESTION:
    const question = action.payload;
    return {
      ...state,
      lastActionId,
      answers: state.answers.concat(state.currentQuestion.answers),
      currentQuestion: {
        id: question.id,
        answers: []
      }
    };
  case ANSWER:
    return {
      ...state,
      lastActionId,
      currentQuestion: {
        ...state.currentQuestion,
        answers: state.currentQuestion.answers.concat({
          ...action.payload,
          questionId: state.currentQuestion.id
        })
      }
    };
  // case NOT_FOUND:
  //   return {
  //     ...state,
  //     status: 'not found',
  //   };
  default:
    return (lastActionId !== state.lastActionId)
      ? { ...state, lastActionId }
      : state;
  }
};
