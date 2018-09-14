const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const taskUtils = require('./utils/task')();

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },  
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'resolve-url-loader',
            { 
              loader: 'sass-loader', 
              options: {
                includePaths: ['./node_modules']
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(taskUtils.iterObj(require('./config/config.prod.json'))),
    new ExtractTextPlugin(
        {filename: '[name].[hash].css', disable: false, allChunks: true}
      ),
    new HtmlWebpackPlugin({
      template: 'src/index-prod.tmpl',
      filename: 'index.html',
      inject: false,
      hash: true,
      showErrors: true,
      chunksSortMode: 'none'
    }),
    new WebpackMd5Hash()
  ]
})
