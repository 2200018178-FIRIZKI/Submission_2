const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    open: false,
    port: 8080,
    client: {
      webSocketURL: 'ws://localhost:8080/ws',
      overlay: {
        errors: true,
        warnings: true,
      },
    },
  },
});
