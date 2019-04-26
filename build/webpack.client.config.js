const path = require('path')
const base = require('./webpack.base.config')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = Object.assign({}, base, {
  mode: process.env.NODE_ENV,
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: (base.plugins || []).concat([
    // strip comments in Vue code
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      BROWSER_BUILD: true
    })
  ])
})

config.plugins.push(
  new MiniCssExtractPlugin({
    filename: 'assets/styles.css'
  })
)

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new HtmlWebpackPlugin({
      processEnv: process.env.NODE_ENV,
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: path.resolve(__dirname, '../index.html'),
      inject: true,
      hash: false,
      cache: false,
      chunks: ['app', 'vendor']
    })
  )
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'assets/styles.[hash].css'
    })
  )
}

module.exports = config
