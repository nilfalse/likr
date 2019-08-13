import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectIsOnline } from '~/ducks/meta';

import { Uberbar } from './Uberbar';

const nothing = {};
export const UberbarContainer = connect(
  state => ({
    isOnline: selectIsOnline(state),
  }),
  dispatch => nothing,
)(Uberbar);
