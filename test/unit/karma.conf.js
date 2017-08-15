const baseConfig = require('../../build/webpack.base.config')
const webpack = require('webpack')
const webpackConfig = Object.assign({}, baseConfig, {
  devtool: '#inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"test"'
    })
  ]
})

// no need for app entry during tests
delete webpackConfig.entry

module.exports = function (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers: ['ChromeHeadless'],
    frameworks: ['mocha', 'sinon-chai'],
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack']
    },
    plugins: [
      // Test Libraries
      'karma-mocha',
      'karma-sinon-chai',
      'karma-chrome-launcher',
      // Preprocessors
      'karma-webpack'
    ],
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    }
  })
}
