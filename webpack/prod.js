const base = require('./base');
const path = require('path');

// const webpack = require('webpack');

const clientConfig = base({
  rules: [],
  config: {
    entry: '../src/index.js',
    stats: 'minimal',
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: '[name].min.js',
      library: 'DolliDB',
      libraryTarget: 'commonjs2',
    },
    plugins: [
      // new webpack.EnvironmentPlugin(['NODE_ENV']),
    ],
  },
});

module.exports = clientConfig;
