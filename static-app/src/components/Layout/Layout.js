import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { Header } from '../Header';

export const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Brought to you by
          {` `}
          <a href="https://nilfalse.com/">nilfalse</a>
        </footer>
      </div>
    </>
  );
};
