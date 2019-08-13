import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { join, leave } from '../ducks/participants';

import { Auth } from './Auth';

export const AuthContainer = connect(
  state => state,
  dispatch => bindActionCreators({ join, leave }, dispatch)
)(Auth);
