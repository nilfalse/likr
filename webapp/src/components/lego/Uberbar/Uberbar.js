import * as React from 'react';

import { AuthContainer } from '~/components/AuthContainer';
import { UberbarProfile } from '../UberbarProfile';
import { MenuButton } from '../MenuButton';

import './Uberbar.css';

const isStandaloneApp = typeof window !== 'undefined' && window.navigator && navigator.standalone;

export const Uberbar = ({ isOnline, children }) => {
  const classNames = [ 'uberbar' ];
  if (isStandaloneApp) {
    classNames.push('uberbar_standalone');
  }

  return (
    <header className={classNames.join(' ')}>
      <div className="uberbar__fixed-container">
        <div className="uberbar__content">
          <div className="uberbar__property">
            <MenuButton />
            <p>{ isOnline ? 'online' : 'offline' }</p>
            {children}
          </div>
          <div className="uberbar__profile">
            {/* <UberbarProfile shape="round">
              <AuthContainer />
            </UberbarProfile> */}
          </div>
        </div>
      </div>
    </header>
  );
};
Uberbar.displayName = 'Uberbar';
