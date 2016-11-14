var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Visualizer = require('webpack-visualizer-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
// var DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  // devtool: 'eval',
  entry: [
    './client/main'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'js/bundle.min.js',
    publicPath: '/public/'
  },
  plugins: [
    new ExtractTextPlugin('css/style.min.css'),
    new webpack.optimize.DedupePlugin(),
    new LodashModuleReplacementPlugin,
    new webpack.optimize.UglifyJsPlugin(),
    new Visualizer({ filename: './stats.html'})
    // new DashboardPlugin()
    // new webpack.DefinePlugin({
    //   'process.env.ENVIRONMENT': '"'+process.env.NODE_ENV+'"'
    // })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'client')
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css?minimize!autoprefixer!sass')
    }]
  }
};