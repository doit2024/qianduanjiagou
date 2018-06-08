const webpack                = require('webpack')
const HtmlWebapckPlugin      = require('html-webpack-plugin')
const HtmlAfterWebapckPlugin = require('./build/html-after-webpack-plugin')
const merge                  = require('webpack-merge')
const argv                   = require('yargs-parser')
const glob                   = require('glob')
const path                   = require('path')

const { join, resolve } = path

const _mode = argv(process.argv.slice(2)).mode || 'development'
const _mergeConfig = require(`./build/webpack.${_mode}.js`)
const _isProdMode = _mode === 'production'

const entries = glob.sync('./src/client/views/**/*.entry.js')
  .map(file => /.+\/(\w+)\.entry\.js$/.exec(file))

const entry = entries.reduce((rst, [v, k]) => (rst[k] = v, rst), {})
const htmlPlugins = entries.map(([file, name]) => new HtmlWebapckPlugin({
    filename: `../views/${name}/${name}.html`,
    template: file.replace('.entry.js', '.html'),
    minify: {
      collapseWhitespace: _isProdMode,
      removeAttributeQuotes: _isProdMode
    },
    inject: false
  }))

const baseConfig = {
  entry,
  output: {
    path: join(__dirname, './dist/assets'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test:/\.js$/,
        exclude: /node_modules/,
        use:[{
          loader:'eslint-loader',
          options:{
            formatter: require('eslint-friendly-formatter')
          }
        }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'img/[name]_[hash:7].[ext]'
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.css', '.less'],
    alias: {
      '@': resolve('src/client'),
    }
  },
  optimization: {
    splitChunks: {
      // chunks: 'async',
      // name: false,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          minSize: 0,
          name: 'commons'
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    }
  },
  plugins: [
    ...htmlPlugins,
    new HtmlAfterWebapckPlugin()
  ]
}

module.exports = merge(baseConfig, _mergeConfig)
