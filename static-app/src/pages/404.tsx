import React from 'react';

import { Button } from '../components/Button';
import { Container } from '../components/Container';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';

import './404.css';

export default () => (
  <Layout className="not-found">
    <SEO title="404: Not found" />
    <article>
      <section>
        <Container className="not-found__content not-found__offset">
          <h1 className="not-found__headline">404 &ndash; NOT FOUND</h1>
          <p className="not-found__copy">Oops! We can’t find the page you’re looking for.</p>
          <p className="not-found__copy not-found__copy_nav">
            <Button to="/" className="not-found__link">
              Click here to go back to our homepage.
            </Button>
          </p>
        </Container>
      </section>
    </article>
  </Layout>
);
