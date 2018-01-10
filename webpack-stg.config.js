var webpack = require('webpack');
var webpackConfig = require('webpack-config');

module.exports = new webpackConfig.Config()
  .extend('./webpack-base.config.js')
  .merge({
    entry: {
      app: './stg.bundle.js'
    },
    plugins: [
    	new webpack.DefinePlugin({
    		'process.env': {
    			'APP_ENV': '"stg"'
    		}
    	})
    ]
  });