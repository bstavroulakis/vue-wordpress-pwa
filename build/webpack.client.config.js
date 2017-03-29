const path = require('path')
const base = require('./webpack.base.config')
const webpack = require('webpack')
// const vueConfig = require('./vue-loader.config')
const appConfig = require('../src/app.config.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = Object.assign({}, base, {
  plugins: (base.plugins || []).concat([
    new ExtractTextPlugin('assets/styles.css'),
    // strip comments in Vue code
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      BROWSER_BUILD: true
    }),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'assets/js/[name].js'
    })
  ])
})

if (process.env.NODE_ENV === 'production') {
  // extract CSS into a single file so it's applied on initial render

  config.plugins.push(
    // this is needed in webpack 2 for minifying CSS
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    // minify JS
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )
}

module.exports = config
