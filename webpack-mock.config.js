var webpackConfig = require('webpack-config');

module.exports = new webpackConfig.Config()
  .extend('./webpack-dev.config.js')
  .merge({
    entry: {
      app: './mock.bundle.js'
    },
    module: {
      loaders: [{
        test: /\.json$/,
        loader: 'json-loader'
      }]
    }
  });