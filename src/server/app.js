const Koa = require('koa')
const router = require('koa-simple-router')
const config = require('./config')
const { PORT } = config

const app = new Koa()

app.use(router(_ => {
  _.get('/', (ctx, next) => {
    ctx.body = 'hello woody'
  })
  _.post('/name/:id', (ctx, next) => {
    ctx.body = 'hello form post'
  })
}))

app.listen(config.PORT, () => {
  console.log(`server is open on: http://localhost:${PORT}`)
})
