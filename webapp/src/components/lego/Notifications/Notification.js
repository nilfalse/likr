import * as React from 'react';

import './Notification.css';

export const Notification = ({ item, dismiss }) => {
  const classNames = [
    'notification',
    'notification_' + item.severity.toLowerCase(),
  ];

  return (
    <div className={classNames.join(' ')}>
      <span>{item.message}</span>
      <button onClick={() => dismiss(item.id)}>&times;</button>
    </div>
  );
};
Notification.displayName = 'Notification';
