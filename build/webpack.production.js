const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { minify } = require("html-minifier")
const { join } = require('path')

const prodConfig = {
  output:{
    filename:"scripts/[name].[hash:6].js"
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader']
      })
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'less-loader', 'postcss-loader']
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin('style/[name].[hash:6].css'),
    new CopyWebpackPlugin([{
      from: join(__dirname, '../src/client/views/common/layout.html'),
      to: '../views/common/layout.html',
      transform: content => minify(content.toString("utf-8"), {
        collapseWhitespace: true
      })
    }]),
    new CopyWebpackPlugin([{
      from: join(__dirname, '../src/client/widgets/'),
      to: '../widgets',
      transform: content => minify(content.toString("utf-8"), {
        collapseWhitespace: true
      })
    }], {
      copyUnmodified: true,
      ignore: ['*.js', '*.css', '*.less']
    })
  ]
}

module.exports = prodConfig
