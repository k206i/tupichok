'use strict';
const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './jsSrc/index.js',
  plugins: [
    new webpack.HotModuleReplacementPlugin() // Enable HMR
  ],

  devServer: {
    hot: true, // Tell the dev-server we're using HMR
    contentBase: resolve(__dirname, ''),
    publicPath: 'http://localhost:8080/'
  },

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query:
          {
            presets:['react']
          }
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.styl/,
        loader: ['style-loader', 'css-loader', 'stylus-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};