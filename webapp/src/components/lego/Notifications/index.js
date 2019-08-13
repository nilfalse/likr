import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Notification } from './Notification';

import { dismiss } from '../../../ducks/notifications';

const Notifications = ({ notifications, dismiss }) => (
  <div className="notifications">
    {notifications.map(
      (item, idx) => <Notification key={idx} idx={idx} item={item} dismiss={dismiss} />
    )}
  </div>
);
Notifications.displayName = 'Notifications';

export const NotificationsContainer = connect(
  state => ({
    notifications: state.notifications
  }),
  dispatch => bindActionCreators({
    dismiss,
  }, dispatch)
)(Notifications);
