import * as React from 'react';

import { RoomCreateFormContainer } from '~/components/RoomCreateFormContainer';

import './RoomNewPage.css';

export const RoomNewPage = () => (
  <div className="room_create">
    <RoomCreateFormContainer />
  </div>
);
RoomNewPage.displayName = 'RoomNewPage';
