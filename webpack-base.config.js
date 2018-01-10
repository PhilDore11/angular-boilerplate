var webpack = require('webpack');

var webpackConfig = require('webpack-config');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = new webpackConfig.Config()
  .merge({
    context: __dirname + '/app',
    entry: {
      vendor: './vendor.bundle.js'
    },
    target: 'web',
    output: {
      path: __dirname + '/app/public',
      filename: "[name].js",
      chunkFilename: "[id].js"
    },
    resolve: {
      extensions: [".js", ".json", ".html"],
      modules: ["./../node_modules", "./bower_components"],
      descriptionFiles: ["package.json", "bower.json"]
    },
    module: {
      loaders: [{
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
        },
        {
          test: /\.html$/,
          loaders: ['ngtemplate-loader?relativeTo=' + (__dirname + '/app'), 'html-loader'],
          exclude: /index\.html$/
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: "file-loader?name=[name].[ext]"
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'JAZZ - Crew Schedule Bidding Application',
        template: './index.html',
        hash: true
      }),
      new ExtractTextPlugin("[name].css"),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.js'
      }),
      new CopyWebpackPlugin([{
        from: 'translations',
        to: 'translations'
      }]),
      new UglifyJSPlugin({
        sourceMap: true
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'DATE': Date.now(),
          'VERSION': JSON.stringify(require("./package.json").version)
        }
      })
    ]
  });