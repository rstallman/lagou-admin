const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  mode: 'development',

  devtool:'source-map',

  entry: {
    'js/app':'./src/app.js'
  },

  output:{
    path:path.join(__dirname, './dist'),
    filename:'[name].js'
  },
 
  
  module: {
    rules: [
      {
        test: /\.art$/, 
        exclude:/(node_modules)/,
        use:{
          loader: 'art-template-loader'
        }
      },
      {
        test: /\.css$/, 
        exclude:/(node_modules)/,
        loaders: ['style-loader','css-loader']
      },
    ],
  }, 

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './public/index.html'),
      filename: 'index.html',
      inject: true
    }),
    new CopyPlugin({
      patterns: [
        { from: './public/*.ico',
          to: path.join(__dirname, './dist/favicon.ico'),
        }, 
        { from: './public/libs/',
          to: path.join(__dirname, './dist/libs/'),
        }, 
      ]
    }),
    
  ],

  devServer: {
    contentBase: path.join(__dirname, './dist'),
    compress: true,
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:3000"
      }
    }
  }
}