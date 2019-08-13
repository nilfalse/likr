import { questions } from '../domain/questions';

export const selectQuestions = (state) => {
  return state.items;
};

export const selectQuestionById = (state, id) => {
  const questions = selectQuestions(state);
  const qIdx = questions.map(q => q.id).indexOf(id);
  return qIdx < 0 ? null : questions[qIdx];
};

const LOAD = 'Questionnaire/LOAD';
const SHUFFLE = 'Questionnaire/SHUFFLE';

export const loadQuestions = () => ({
  type: LOAD,
  payload: {
    revision: 0,
    items: questions
  }
});

const initialState = {
  rev: null,
  items: []
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
  case LOAD:
    return {
      ...state,
      rev: action.payload.revision,
      items: action.payload.items
    };
  default:
    return state;
  }
};
