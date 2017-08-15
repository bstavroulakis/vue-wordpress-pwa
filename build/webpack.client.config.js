const path = require('path')
const base = require('./webpack.base.config')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const appConfig = require('../src/app.config.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = Object.assign({}, base, {
  plugins: (base.plugins || []).concat([
    // strip comments in Vue code
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      BROWSER_BUILD: true
    }),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: (process.env.NODE_ENV === 'production') ? 'assets/js/[name].[hash].js' : 'assets/js/[name].js'
    })
  ])
})

config.module.rules.filter(x => { return x.loader == 'vue-loader'}).forEach( x => x.options.extractCSS = true)

config.plugins.push(
  new ExtractTextPlugin('assets/styles.css')
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
    new ExtractTextPlugin('assets/styles.[hash].css'),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )
} else {
  config.plugins.push(
    new ExtractTextPlugin('assets/styles.css')
  )
}

module.exports = config
