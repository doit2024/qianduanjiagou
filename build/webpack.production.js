const ExtractTextPlugin = require('extract-text-webpack-plugin')

const prodConfig = {
  output:{
    filename:"scripts/name.[hash:5].bundle.js"
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
    new ExtractTextPlugin('style/[name]_[hash:6].css')
  ]
}

module.exports = prodConfig
