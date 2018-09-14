const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const glob = require('glob')

module.exports = {
  entry: {
    app: './src/app.js',
    lib: glob.sync(path.resolve(__dirname, './src/lib/*.js'))
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                enforce: true,
                chunks: 'all'
            }
        }
    }
  },
  module: {
    rules: [
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: {loader: 'html-loader'}
        },      
        {
          test: /\.js$/,
          exclude: /(node_modules|lib)/,
          use: {
            loader: 'babel-loader',
          }
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                includePaths: ['./node_modules'],
              }    
            }            
          ]
        },
        {
          test: /\.css$/,
          use: [
            'to-string-loader',
            'css-loader',
            'resolve-url-loader'
          ]
        },        
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader'
            }
          ]
        },
        { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff2' } },
        { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff' } },
        { test: /\.(ttf|eot|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'file-loader' }        
    ]  
  },
  plugins: [    
    new CleanWebpackPlugin(['dist'])
  ]  
}