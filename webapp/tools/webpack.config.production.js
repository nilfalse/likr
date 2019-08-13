const node = require('./webpack.config.node');
const web = require('./webpack.config.web');

module.exports = [
  node,
  (...args) => {
    const webConfig = web(...args);
    return {
      ...webConfig,
      entry: {
        polyfills: './src/web/polyfills',
        ...webConfig.entry
      }
    };
  }
];
