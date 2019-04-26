const path = require('path')
const webpack = require('webpack')
const base = require('./webpack.base.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = Object.assign({}, base, {
  mode: process.env.NODE_ENV,
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

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'assets/styles.[hash].css'
    })
  )
} else {
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'assets/styles.css'
    })
  )
}

module.exports = config
