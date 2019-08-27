import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import { Button } from '../components/Button';
import { Container, Split } from '../components/Container';
import ImageSplit from '../components/ImageSplit';
import { Hero } from '../components/Hero';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';

import pwa from '../images/pwa.svg';
import './index.css';

export default () => {
  const { hero } = useStaticQuery(graphql`
    query {
      hero: file(relativePath: { eq: "landing/hero.jpg" }) {
        childImageSharp {
          fluid(maxHeight: 660) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  return (
    <Layout className="page_index index">
      <SEO />
      <article>
        <Hero>
          <Container mode="split" className="index__section">
            <Split className="index__split index__container index__offset">
              <h1 className="index__headline">Play. Match. Share.</h1>
              <p className="index__copy">
                Play a short game together with your friend or partner and see immediately how you
                match.
              </p>
              <p className="index__copy">
                <strong className="index__bold">It's free to get started.</strong>
              </p>
              <div className="index__cta">
                <Button to="/app/" theme="cta">
                  Get&nbsp;Started
                </Button>
              </div>
            </Split>
            <Split className="index__split">
              <Img fluid={hero.childImageSharp.fluid} loading="eager" />
            </Split>
          </Container>
        </Hero>
        <section className="index__section index__section_light">
          <Container mode="split">
            <Split className="index__container">
              <h2 className="index__headline">Play the game</h2>
              <p className="index__copy">
                <strong className="index__bold">
                  It takes less than 1 minute to create a room.
                </strong>
              </p>
            </Split>
            <Split className="index__container">
              <p className="index__copy">
                You will be presented with two options to choose from, there is an example below.
              </p>
              <p className="index__copy">
                Once both players settle on answers, the game continues to the next pair of options
                and so on.
              </p>
            </Split>
          </Container>
        </section>
        <section className="index__section">
          <ImageSplit />
        </section>
        <section className="index__section index__section_light">
          <Container mode="split">
            <Split className="index__container">
              <h2 className="index__headline">Match the others</h2>
              <p className="index__copy">
                <strong className="index__bold">Realtime results at your fingertips.</strong>
              </p>
            </Split>
            <Split className="index__container">
              <p className="index__copy">
                Venn diagram provides visual feedback on whether it's a&nbsp;match or mismatch.
              </p>
              <p className="index__copy">
                The response is immediate and updates as soon as new data arrives.
              </p>
              <p className="index__copy">
                The more advanced statistics with details is always available in just one click.
              </p>
            </Split>
          </Container>
        </section>
        <section className="index__section index__section_dark">
          <Container mode="split">
            <Split className="index__container">
              <h2 className="index__headline">Share the fun</h2>
              <div>
                <Button to="/app/" theme="cta">
                  Get&nbsp;Started
                </Button>
              </div>
              <p className="index__copy">
                <strong className="index__bold">No need to install anything.</strong>
              </p>
            </Split>
            <Split className="index__container">
              <p className="index__copy">Spread the word and enjoy the game with friends.</p>
              <p className="index__copy">
                <img src={pwa} alt="Progressive Web App logo" />
              </p>
              <p className="index__copy">
                A truly <strong className="index__bold">Progressive Web App</strong> that can run on
                any device and platform. Right here, just a click away.
              </p>
            </Split>
          </Container>
        </section>
      </article>
    </Layout>
  );
};
