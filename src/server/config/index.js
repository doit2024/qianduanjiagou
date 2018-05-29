const path = require('path')

let config = {
  PORT: '3000',
  VIEW_DIR: path.join(__dirname, '..', 'views'),
  STATIC_DIR: path.join(__dirname, '..', 'assets')
}

const development = {
  PORT: '4000'
}

const production = {
  PORT: '5000'
}

if (process.env.NODE_ENV === 'development') {
  config = Object.assign({}, config, development) 
}

if (process.env.NODE_ENV === 'production') {
  config = Object.assign({}, config, production)
}

module.exports = config
