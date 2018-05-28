const IndexController = require('./IndexController')

const controllerInit = {
  routers: (app, router) => {
    app.use(router(_ => {
      _.get('/', IndexController.indexAction)
      _.post('/name/:id', IndexController.getNameAction)
    }))
  }
}

module.exports = controllerInit
