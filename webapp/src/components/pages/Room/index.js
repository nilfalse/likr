import * as React from 'react';

import { RoomContainer } from '../../RoomContainer';

export const RoomPage = (props) => (
  <div className="room">
    <RoomContainer {...props} />
  </div>
);
RoomPage.displayName = 'RoomPage';
