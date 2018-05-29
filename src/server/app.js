const Koa             = require('koa')
const router          = require('koa-simple-router')
const log4js          = require('log4js')
const staticServer    = require('koa-static')
const render          = require('koa-swig')
const co              = require('co')

const controllerInit  = require('./controllers/controllerInit')
const errorHandler    = require('./middlewares/error.handler')
const config          = require('./config')


const { PORT, VIEW_DIR, STATIC_DIR } = config
const app = new Koa()

// 模板
app.context.render = co.wrap(render({
  root: VIEW_DIR,
  autoescape: true,
  cache: 'memory',
  ext: 'html',
  // locals: locals,
  // filters: filters,
  varControls: ['[[', ']]'],
  // extensions: extensions,
  writeBody: false
}))

// 错误日志
log4js.configure({
  appenders: { cheese: { type: 'file', filename: `${__dirname}/logs/cheese.log` } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
})
errorHandler.error(app, log4js.getLogger('cheese'))


// 路由
controllerInit.routers(app, router)


// 静态资源
app.use(staticServer(STATIC_DIR))


// 启动
app.listen(PORT, () => {
  console.log(`server is open on: http://localhost:${PORT}`)
})
