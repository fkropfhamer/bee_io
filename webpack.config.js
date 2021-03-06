const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './assets/js/main.js',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        include: path.resolve(__dirname, 'assets', 'images'),
        use: ['file-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.mp3$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'assets', 'index.html') }),
  ],
  resolve: {
    extensions: ['*', '.js'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public'),
  },
};
