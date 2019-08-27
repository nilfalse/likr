import React, { FC } from 'react';

import { Container } from '../Container';

import { SocialShare } from './SocialShare';

export const Footer: FC = () => (
  <footer>
    <Container className="footer__container">
      <section className="footer__content">
        <h5 className="footer__social-header">Share now on:</h5>
        <SocialShare />
      </section>
      <section className="footer__copyright">
        <h6 className="footer__copyright-title footer__no-wrap">
          Copyright &copy; 2015 &ndash; {new Date().getFullYear()}{' '}
          <a href="https://nilfalse.com/" rel="noopener" className="footer__link">
            nilfalse
          </a>
          .
        </h6>
        <span className="footer__no-wrap">All rights reserved.</span>
      </section>
    </Container>
  </footer>
);
