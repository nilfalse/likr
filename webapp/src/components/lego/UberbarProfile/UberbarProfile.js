import React, { Component } from 'react';

import './UberbarProfile.css';

export class UberbarProfile extends Component {
  state = {
    isOpen: false,
  };

  render () {
    const { shape } = this.props;
    const { isOpen } = this.state;

    const classNames = [ 'uberbar-profile' ];
    if (shape === 'round') {
      classNames.push('uberbar-profile_round');
    }

    return (
      <nav className={classNames.join(' ')}>
        <label className="uberbar-profile__container">
          <input type="checkbox" className="uberbar-profile__button" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%">
            <rect fill="#DDE5E8" width="32" height="32" rx="6"></rect>
            <path d="M16 32H7.7c-2.68 0-3.65-.28-4.63-.8A5.45 5.45 0 0 1 .8 28.93c-.52-.98-.8-1.95-.8-4.62V7.69c0-2.67.28-3.64.8-4.62A5.45 5.45 0 0 1 3.07.8C3.54.55 4 .36 4.65.22 4.3 4.67 4.7 8.36 4.77 9c.08.7.82-.37 1.77-.54a.79.79 0 0 0-.04.2 2.67 2.67 0 0 0 .28 4.62c.05.54.22 1.01.73 1.37v1.84c-.19.03-.38.05-.58.05a4.52 4.52 0 0 1-3.05-1.52C3 17.85 4.85 20 6.93 21.5 9 23 13 22 14 22l-2 3H9.5s1.24 4.69 6.5 5v2z" fill="#C8D7DC"></path>
            <path d="M13.28 10c-.04 0 .92 9.75.92 9.75l-2.2-.88.34-8.3.94-.57zM22 13.73c-.88-.63-2.62-1.87-.6-4.6-1.6.3-3.4 2.09-3.4 3.79a3.46 3.46 0 0 0 4 3.41v-2.6z" fill="#C8D7DC"></path>
            <path d="M23 7c-2.86 0-4.33 2.56-4.63 2.87a1.25 1.25 0 1 0 1.76 1.76c.35-.34 1.46-2.96 3.7-2.96 1.16 0 2.54.53 4.17 1.66C26.45 7.73 24.66 7 23 7zM9 7c-1.66 0-3.45.73-5 3.33C5.63 9.2 7.01 8.67 8.17 8.67c2.24 0 3.35 2.62 3.7 2.96a1.25 1.25 0 1 0 1.76-1.76C13.33 9.57 11.86 7 9 7zM8.5 12c-1.43 0-2.7.6-3.5 1.5.8.9 2.07 1.5 3.5 1.5 1.44 0 2.7-.6 3.5-1.5-.8-.9-2.06-1.5-3.5-1.5zM23.5 12c-1.43 0-2.7.6-3.5 1.5.8.9 2.07 1.5 3.5 1.5 1.43 0 2.7-.6 3.5-1.5-.8-.9-2.07-1.5-3.5-1.5zM4 19l5 7h5l2-2 2 2h5l5-7-6 5h-2l-3-3h-2l-3 3h-2zM14 29l1 3h2l1-3z" fill="#8498A1"></path>
          </svg>
          <div className="uberbar-profile__overlay" />
          <ul className="uberbar-profile__modal">
            <li>
              <a href="https://yandex.com" target="_blank" className="uberbar-profile__modal-list-item">
                Yandex
              </a>
            </li><li>
            <a href="https://www.google.com" target="_blank" className="uberbar-profile__modal-list-item">
              Google
            </a>
            </li>
          </ul>
        </label>
      </nav>
    );
  }
}
