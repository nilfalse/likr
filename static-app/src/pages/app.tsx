import React from 'react';

import { Container, Split } from '../components/Container';
import { Hero } from '../components/Hero';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { SmartphoneSubmit } from '../components/SmartphoneSubmit';

import { LaunchSignupForm, useLaunchSignupFormSubmit } from '../forms/LaunchSignupForm';

import './app.css';

export default () => {
  const [submit, handleSubmit] = useLaunchSignupFormSubmit();

  return (
    <Layout mode="no-auth" className="page_app app">
      <SEO title="App" />
      <article>
        <Hero>
          <Container className="app__container app__offset">
            <Split>
              <h1 className="app__headline">Thanks for coming in</h1>
              <p className="app__copy">
                We are working hard to deliver the first version of the app.
              </p>
              <p className="app__copy">
                <strong className="app__bold">Check back soon.</strong>
              </p>
            </Split>
          </Container>
        </Hero>
        <section className="app__section app__section_light">
          <Container mode="split" className="app__section-container_subscribe">
            <Split className="app__container">
              <h2 className="app__headline">Stay tuned</h2>
              <p className="app__copy">
                If you enter your email below you will get access to the app earlier than others.
              </p>
              <LaunchSignupForm canSubmit={submit.status !== 'request'} onSubmit={handleSubmit} />
              <p className="app__copy">No spam, promise.</p>
            </Split>
            <Split>
              <SmartphoneSubmit
                status={submit.status}
                email={submit.email}
                className="app__smartphone"
              >
                {submit.status === 'failure' ? (
                  <>
                    <h3 className="app__headline">Oops!</h3>
                    <p className="app__copy">Something went wrong.</p>
                    <p className="app__copy">Can you please refresh the page and try again?</p>
                  </>
                ) : (
                  <>
                    <h3 className="app__headline">Thank you!</h3>
                    <p className="app__copy">Great to have you on board.</p>
                    <p className="app__copy">
                      You will be among the first to hear from us when we launch.
                    </p>
                  </>
                )}
              </SmartphoneSubmit>
            </Split>
          </Container>
        </section>
      </article>
    </Layout>
  );
};
