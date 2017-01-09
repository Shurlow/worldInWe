var path = require('path');
var webpack = require('webpack');

module.exports = {
  // devtool: 'cheap-module-eval-source-map',
  debug: true,
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/main'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'js/bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'client')
    },
    {
      test: /\.scss$/,
      loader: 'style!css?sourceMap!autoprefixer!sass?sourceMap'
    },
    {
      test: /\.(otf)$/,
      loader: 'url'
    }
    ]
  }
};
