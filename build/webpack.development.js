const CopyWebpackPlugin = require('copy-webpack-plugin')
const { join } = require('path')

const devConfig = {
  output:{
    filename:"scripts/[name].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.less$/,
        use: [ 'style-loader', 'css-loader', 'less-loader' ]
      }
    ]
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: join(__dirname, '../src/client/views/common/layout.html'),
      to: '../views/common/layout.html'
    }]),
    new CopyWebpackPlugin([{
      from: join(__dirname, '../src/client/widgets/'),
      to: '../widgets'
    }], {
      copyUnmodified: true,
      ignore: ['*.css', '*.js']
    })
  ]
}

module.exports = devConfig
