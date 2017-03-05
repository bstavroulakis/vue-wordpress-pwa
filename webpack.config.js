const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const Config = require('./src/app.config.js');

module.exports = {
  entry: {
    app:'./src/app.js',
    vendor: ['vue','vuex-router-sync','vue-resource','vue-router','vuex']
  },
  output: {
    path: path.resolve(__dirname, './'),
    publicPath: '/',
    filename: 'js/[name]_[hash].js'
  },
  resolve:{
    extensions: ['.js', '.vue', '.css', '.json'],
      package: path.resolve(__dirname, './package.json'),
      src: path.resolve(__dirname, './src'),
      assets: path.resolve(__dirname, './src/assets'),
      components: path.resolve(__dirname, './src/components'),
      theme: path.resolve(__dirname, './src/theme'),
  },
  module: {
    rules: [
      {
        test: /(src\\assets\\manifest\.json)$/,
        loader: `file-loader?name=[name]_[hash].[ext]!extract-loader!html-loader?interpolate`
      },
      {
        test: /(src\\sw\.js)$/,
        loader: `file-loader?name=[name]_[hash].[ext]!extract-loader!html-loader?interpolate`
      },
      {
        test: /(src\\index-appCache\.html)$/,
        loader: `file-loader?name=[name]_[hash].[ext]!extract-loader!html-loader?interpolate`
      },
      {
        test: /(src\\assets\\local\.appcache)$/,
        loader: `file-loader?name=[name]_[hash].[ext]`
      },
      {
        test: /(sw_config\.js)$/,
        loader: `file-loader?name=[name]_[hash].[ext]`
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name]_[hash].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'assets/fonts/[name]_[hash:7].[ext]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map',
  plugins:[
    new HtmlWebpackPlugin({
      title: Config.appTitle,
      appThemeColor: Config.appThemeColor,
      processEnv: process.env.NODE_ENV,
      filename: 'index.html',
      template: './src/index.html',
      inject: true,
      hash: false,
      cache: false,
      chunks: ['app', 'vendor']
    }),
    new webpack.optimize.CommonsChunkPlugin({name:"vendor",  filename:"js/vendor.bundle_[hash].js"}),
  ]
}

if (process.env.NODE_ENV === 'production') {

  module.exports.output.path = path.resolve(__dirname, './dist')
  module.exports.devtool = '#source-map'
  module.exports.performance = {
      maxAssetSize: 150000,
      maxEntrypointSize: 150000,
      hints: 'warning'
  };
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new WebpackCleanupPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}