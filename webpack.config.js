const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

require('dotenv').config();

module.exports = {
  mode: 'production',
  entry: './app.js',
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'final.js',
  },
  target: 'node',
  externals: [nodeExternals()],
  plugins: [
    new webpack.EnvironmentPlugin(['PORT', 'MONGO_URL', 'JWT_SECRET_KEY', 'JWT_EXPIRES_IN', 'USER_USERNAME', 'USER_PASSWORD']),
  ],
};