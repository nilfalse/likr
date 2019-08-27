module.exports = {
  siteMetadata: {
    siteUrl: `http://likr.xyz/`,
    title: `likr`,
    description: `Find out how well you match with another person`,
    author: `@nilfalse`,
    shareText: `Check out this cool new game`,
    hashtags: [`game`, `play`, `match`, `likr`],
  },
  plugins: [
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [require('postcss-preset-env')({ stage: 3 }), require('autoprefixer')],
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        useMozJpeg: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
      },
    },
  ],
};
