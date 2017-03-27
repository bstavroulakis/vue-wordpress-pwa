const webpack = require('webpack')
const base = require('./webpack.base.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = Object.assign({}, base, {
  target: 'node',
  devtool: false,
  entry: './src/server-entry.js',
  output: Object.assign({}, base.output, {
    filename: 'server/[name].js',
    libraryTarget: 'commonjs2'
  }),
  externals: ['axios'],
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"',
      BROWSER_BUILD: false
    })
  ]
})
