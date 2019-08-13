const path = require('path');

const AssetsPlugin = require('assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { root, buildRoot, codeRule, resolve } = require('./webpack.commons');

function web (env, argv) {
  const outputPath = path.resolve(buildRoot, 'static');
  const outputFilename = (argv.mode === 'development')
    ? '[name]'
    : '[name].[contenthash]';

  const plugins = [
    new AssetsPlugin({ path: buildRoot }),
    new MiniCssExtractPlugin({ filename: outputFilename + '.css' })
  ];

  if (argv.mode !== 'development') {
    const CopyWebpackPlugin = require('copy-webpack-plugin');
    plugins.push(new CopyWebpackPlugin([ { from: 'static' } ]));

    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
    plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: Boolean(process.env['CI']) ? 'disabled' : 'server',
    }));
  }

  return {
    entry: {
      bundle: './src/web/index',
    },
    devServer: {
      host: '0.0.0.0',
      proxy: [{
        context: ['**', '!/sockjs-node/**'],
        target: 'http://localhost:7899/',
        ws: true,
      }],
    },
    plugins,
    module: {
      rules: [
        codeRule,
        {
          test: /\.css$/, use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
        }
      ]
    },
    resolve,
    output: {
      path: outputPath,
      publicPath: '/',
      filename: outputFilename + '.js',
    }
  };
}

module.exports = web;
