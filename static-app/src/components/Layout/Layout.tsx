import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

import { Footer } from '../Footer';
import { Header } from '../Header';
import { CookieConsent } from '../CookieConsent';

export interface LayoutProps {
  mode?: 'no-auth';
  className?: string;
}

export const Layout: FC<LayoutProps> = ({ children, className, mode }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const classNames = ['page'];
  if (className) {
    classNames.push(className);
  }

  return (
    <>
      <Helmet>
        <body className={classNames.join(' ')} />
      </Helmet>
      <Header siteTitle={data.site.siteMetadata.title} mode={mode} />
      <main className="layout__content">{children}</main>
      <CookieConsent />
      <Footer />
    </>
  );
};
