const IndexModel = require('../models/IndexModel')

const IndexController = {

  indexAction: async (ctx, next) => {
    const indexModel = new IndexModel()
    ctx.body = await indexModel.getData()
  },

  getNameAction: async (ctx, next) => {
    const { id } = ctx.params
    ctx.body = `hello getName ${id}`
  }

}

module.exports = IndexController
