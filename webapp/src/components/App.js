import * as React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import { Button } from './lego/Button';
import { UberbarContainer } from './lego/Uberbar';
import { NotificationsContainer } from './lego/Notifications/index';

import { NotFoundPage } from './pages/404';
import { HomePage } from './pages/Home';
import { RoomPage } from './pages/Room';
import { RoomNewPage } from './pages/RoomNew';

import './App.css';

export const App = () => (
  <div>
    <a className="skip-link" href="#main">Skip to content</a>
    <UberbarContainer>
      <Button to="/rooms/create" className="button_primary">
        Play New Game
      </Button>
    </UberbarContainer>
    <NotificationsContainer />

    <main id="main" className="main">
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Redirect path="/rooms" exact to="/" />
        <Route path="/rooms/create" exact component={RoomNewPage} />
        <Route path="/rooms/:rid" component={RoomPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </main>
  </div>
);
App.displayName = 'App';
