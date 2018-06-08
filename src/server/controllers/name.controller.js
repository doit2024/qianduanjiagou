const { route, GET } = require('awilix-koa')

@route("/name")
class IndexController {
  constructor({ indexService }) {
    this.indexService = indexService
  }
  @route('/:id')
  @GET()
  async getNameAction(ctx, next){
    const { id } = ctx.params
    ctx.body = await ctx.render('index/index', { id })
  }
}

module.exports = IndexController