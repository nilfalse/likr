const path = require('path');

const root = path.resolve(__dirname, '..');
const buildRoot = path.resolve(root, 'dist');

const codeRule = {
  test: /\.[tj]sx?$/,
  loader: 'ts-loader',
  exclude: /node_modules/
};

const resolve = {
  extensions: [ '.tsx', '.ts', '.js' ],
  alias: { '~': path.resolve(root, 'src') }
};

module.exports = {
  root,
  buildRoot,
  codeRule,
  resolve,
};
