var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  debug: true,
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
    new webpack.optimize.UglifyJsPlugin()
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