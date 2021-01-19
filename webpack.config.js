const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  watch: true,
  context: path.resolve(__dirname, 'client'),
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist')
  },
  plugins: [
    new HTMLPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'public/[name].[ext]'
        }
      }
    ],
  }
}

// const path = require('path');
// const MinifyPlugin = require('babel-minify-webpack-plugin');
// const HTMLPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// module.exports = {
//     mode: 'development',
//     devtool: 'source-map',
//     entry: {
//         front: './client/index.js',
//         back: './server/server.dev.js'
//     },
//     output: {
//         filename: '[name].js',
//         path: path.join(__dirname, '/dist')
//     },
//     module: {
//         rules: [
//             {
//                 test: /.js$/,
//                 exclude: /node_modules/,
//                 loader: 'babel-loader'
//             },
//             {
//                 test: /\.s[ac]ss$/i,
//                 use: ["style-loader", "css-loader", "sass-loader"],
//             },
//             {
//                 test: /\.(jpg|png|svg)$/,
//                 loader: 'file-loader',
//                 options: {
//                 name: 'public/[name].[ext]'
//                 }
//             }
//         ]
//     },
//     plugins: [
//         new MinifyPlugin({}, {
//             comment: false
//         }),
//         new HTMLPlugin({
//             template: './index.html'
//         }),
//         new CleanWebpackPlugin()
//     ]
// }