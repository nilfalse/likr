import * as React from 'react';
import { Provider } from 'react-redux';

import { reducer as notifications } from '~/ducks/notifications';

import { configureStore } from '.';

export const provideStore = (children) => {
  const store = configureStore({
    reducers: { notifications },
  });

  return <Provider store={store}>{children}</Provider>;
};
