const webpack    = require('webpack')
const merge      = require('webpack-merge')
const argv       = require('yargs-parser')
const glob       = require('glob')
const path       = require('path')

const { join, resolve } = path

const _mode = argv(process.argv.slice(2)).mode || 'development'
const _mergeConfig = require(`./build/webpack.${_mode}.js`)


const regEntryFile = /.+\/(\w+)-(\w+)\.entry\.js$/

const entry = glob.sync('./src/client/views/**/*.entry.js')
  .map(file => regEntryFile.exec(file))
  .reduce((rst, [v, k]) => (rst[k] = v, rst), {})


const baseConfig = {
  entry,
  output: {
    path: join(__dirname, './dist/assets'),
    publicPath: '/',
    filename: 'scripts/[name].boudle.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test:/\.(js|html)$/,
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
  }
}

module.exports = merge(baseConfig, _mergeConfig)
