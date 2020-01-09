const cluster = require('cluster')
const Koa = require('Koa')
const app = new Koa()
const { dispatch } = require('./event-stream')

cluster.setupMaster({ exec: './b.js' })
cluster.fork()
let workerList = []
for (const key in cluster.workers) {
  if (cluster.workers.hasOwnProperty(key)) {
    workerList.push(cluster.workers[key])
  }
}

app.use(async ctx => {
  const res = await dispatch({
    instance: workerList[0],
    msg: new Date().getTime()
  })
  ctx.body = {
    x: 1,
    res
  }
})
app.listen(2345)
