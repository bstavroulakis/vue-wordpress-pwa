const path = require('path')
const webpack = require('webpack')
const base = require('./webpack.base.config')

const config = Object.assign({}, base, {
  target: 'node',
  devtool: false,
  entry: './src/server-entry.js',
  output: Object.assign({}, base.output, {
    filename: 'server/[name].js',
    libraryTarget: 'commonjs2'
  }),
  externals: ['axios'],
  plugins: (base.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"',
      BROWSER_BUILD: false
    })
  ])
})

module.exports = config
