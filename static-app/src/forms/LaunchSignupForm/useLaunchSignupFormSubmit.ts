import { useEffect, useReducer, useState } from 'react';

type SubmitActionStatus = null | 'request' | 'success' | 'failure';

interface SubmitState {
  status: SubmitActionStatus;
  email: null | string;
}

interface SubmitHandledAction {
  type: 'success';
  payload: SubmitState['email'];
}

interface SubmitFailureAction {
  type: 'failure';
  error: any;
}

interface SubmitRequestAction {
  type: 'request';
  payload: SubmitState['email'];
}

function submitReducer(
  state: SubmitState,
  action: SubmitRequestAction | SubmitHandledAction | SubmitFailureAction,
): SubmitState {
  if (action.type === 'request') {
    return { status: action.type, email: action.payload };
  } else {
    return { ...state, status: action.type };
  }
}

export function useLaunchSignupFormSubmit(): [SubmitState, (e: string) => any] {
  const [state, dispatch] = useReducer(submitReducer, { status: null, email: null });
  const [email, handleSubmit] = useState('');

  useEffect(() => {
    if (!email) {
      return;
    }

    let shouldIgnore = false;

    // console.log('submit', email);
    dispatch({ type: 'request', payload: email });

    fetch('https://apis.nilfalse.com/signup/' + email, {
      method: 'POST',
    })
      .then(resp => {
        return resp.json().then(json => ({ resp, json }));
      })
      .then(({ resp, json }) => (resp.status === 200 ? json : Promise.reject(resp)))
      .then(
        () => {
          if (shouldIgnore) {
            return;
          }

          dispatch({ type: 'success', payload: email });
        },
        error => {
          if (shouldIgnore) {
            return;
          }

          dispatch({ type: 'failure', error });
        },
      );

    return () => {
      shouldIgnore = true;
    };
  }, [email]);

  return [state, handleSubmit];
}
