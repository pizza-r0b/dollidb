const base = require('./base');
const path = require('path');

// const webpack = require('webpack');

const clientConfig = base({
  rules: [],
  config: {
    stats: 'minimal',
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: '[name].min.js',
      library: 'DolliDB',
      libraryTarget: 'umd',
    },
    plugins: [
      // new webpack.EnvironmentPlugin(['NODE_ENV']),
    ],
  },
});

module.exports = clientConfig;
