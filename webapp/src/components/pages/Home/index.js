import * as React from 'react';

import { RoomCreateFormContainer } from '../../RoomCreateFormContainer';
import { RoomListContainer } from '../../RoomListContainer';

import { Button } from '~/components/lego/Button';

import './HomePage.css';

export const HomePage = () => (
  <div className="home home_with-floating-button">
    <RoomListContainer />
    <div className="home__create-room-button-container">
      <Button to="/rooms/create" className="button_floating button_round home__create-room-button">
        +
      </Button>
    </div>
  </div>
);
HomePage.displayName = 'HomePage';
