const { route, GET } = require('awilix-koa')

@route("/")
@route("/index.html")
class IndexController {
  constructor({ indexService }) {
    this.indexService = indexService
  }
  @GET()
  async indexAction(ctx, next){
    ctx.body = await this.indexService.getData()
  }
  @route('/name/:id')
  async getNameAction(ctx, next){
    const { id } = ctx.params
    ctx.body = await ctx.render('index/index', { id })
  }
}

module.exports = IndexController
