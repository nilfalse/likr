import React, { FC } from 'react';
import { Link } from 'gatsby';

import { Button } from '../Button';
import { Container } from '../Container';

import logo from './logo.svg';
import text from './logo-text.svg';

interface HeaderProps {
  mode?: 'no-auth';
  siteTitle: string;
}

export const Header: FC<HeaderProps> = ({ mode }) => (
  <header className="header">
    <div className="header__fixed">
      <Container className="header__container" presentation="nav">
        <div className="header__logo-container">
          <Link to="/" className="header__logo">
            <img src={logo} alt="likr logo" className="header__logo-img" />
            <span className="header__logo-txt">
              <img src={text} alt="likr logo text" className="header__logo-img" />
            </span>
          </Link>
        </div>
        {mode === 'no-auth' ? null : (
          <ul className="header__property">
            <li className="header__nav-item">
              <Button to="/app/">Sign&nbsp;In</Button>
            </li>
            <li className="header__nav-item">
              <Button to="/app/" theme="outline">
                Sign&nbsp;Up
              </Button>
            </li>
          </ul>
        )}
      </Container>
    </div>
  </header>
);

Header.defaultProps = {
  siteTitle: ``,
};
