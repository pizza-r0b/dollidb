const base = require('./base');
const path = require('path');
// const webpack = require('webpack');

const clientConfig = base({
  rules: [],
  config: {
    stats: 'minimal',
    plugins: [
      // new webpack.EnvironmentPlugin(['NODE_ENV']),
    ],
  },
});

module.exports = clientConfig;
