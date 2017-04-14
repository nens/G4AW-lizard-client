
var webpack = require('webpack');

var libraryName = 'Lizard';

var config = {
  entry: [__dirname + '/src/index.js'],
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: libraryName + '.js',
    publicPath: '/scripts/',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    // Redirect these to Lizard NXT running on port 8000,
    // for local development. Login through /admin.
    proxy: {
      '/api': 'http://127.0.0.1:8000/',
      '/admin': 'http://127.0.0.1:8000/',
      '/static': 'http://127.0.0.1:8000/',
    }
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader?modules', 'postcss-loader']
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules|LizardApiClient/
      }
    ]
  },

};

module.exports = config;
