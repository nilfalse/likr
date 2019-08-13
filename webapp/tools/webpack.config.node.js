const path = require('path');

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const { root, buildRoot, codeRule, resolve } = require('./webpack.commons');

function node (env, argv) {
  const entry = ['./src/node/start'];
  const plugins = [
    new CleanWebpackPlugin([ path.join(buildRoot, '**') ], { root }),
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      entryOnly: true,
      raw: true,
    }),
  ];

  // FIXME: the port is default, but has to be specified due to StartServerPlugin internals,
  //        may already be fixed in @beta.
  const startServerPluginOptions = {
    name: 'index.js',
    nodeArgs: ['--inspect=9229'],
  };

  if (argv.hot) {
    entry.unshift('webpack/hot/signal');
    startServerPluginOptions.signal = true;
    startServerPluginOptions.keyboard = true;
  }

  if (argv.mode === 'development') {
    const StartServerPlugin = require('start-server-webpack-plugin');
    plugins.push(
      new webpack.EnvironmentPlugin({
        ROOT: root,
        BUILD_ROOT: buildRoot,
      }),
      new StartServerPlugin(startServerPluginOptions)
    );
  }

  return {
    entry: { index: entry },
    target: 'node',
    node: false,
    externals: nodeExternals({ whitelist: 'webpack/hot/signal' }),
    plugins,
    module: {
      rules: [
        codeRule,
        {
          test: /\.css$/, use: 'null-loader'
        }
      ]
    },
    resolve,
    output: { path: buildRoot }
  }
};

module.exports = node;
