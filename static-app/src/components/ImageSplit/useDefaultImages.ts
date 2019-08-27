import { useStaticQuery, graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';

type FluidTuple = Readonly<[FluidObject, FluidObject]>;

export const useDefaultImages: () => ReadonlyArray<FluidTuple> = () => {
  const { beach, mountains, cat, dog, party, relax } = useStaticQuery(graphql`
    query {
      beach: file(relativePath: { eq: "splits/1-beach.jpg" }) {
        childImageSharp {
          fluid(maxHeight: 600) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      mountains: file(relativePath: { eq: "splits/1-mountains.jpg" }) {
        childImageSharp {
          fluid(maxHeight: 600) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }

      cat: file(relativePath: { eq: "splits/2-cat.jpg" }) {
        childImageSharp {
          fluid(maxHeight: 600) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      dog: file(relativePath: { eq: "splits/2-dog.jpg" }) {
        childImageSharp {
          fluid(maxHeight: 600) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }

      party: file(relativePath: { eq: "splits/3-party.jpg" }) {
        childImageSharp {
          fluid(maxHeight: 600) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      relax: file(relativePath: { eq: "splits/3-relax.jpg" }) {
        childImageSharp {
          fluid(maxHeight: 600) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  return [
    [beach.childImageSharp.fluid, mountains.childImageSharp.fluid],
    [cat.childImageSharp.fluid, dog.childImageSharp.fluid],
    [party.childImageSharp.fluid, relax.childImageSharp.fluid],
  ];
};
