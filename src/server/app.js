const Koa = require('koa')
const router = require('koa-simple-router')
const controllerInit = require('./controllers/controllerInit')
const config = require('./config')

const { PORT } = config
const app = new Koa()

controllerInit.routers(app, router)

app.listen(PORT, () => {
  console.log(`server is open on: http://localhost:${PORT}`)
})
