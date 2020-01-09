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

// let id=0
app.use(async ctx => {
  // id++
  // workerList[0].send({
  //   __id:id,
  //   __msg:new Date().getTime()
  // })
  // let res = await new Promise(resolve => {
  //   let cb = e => {
  //     resolve(e);
  //     workerList[0].off('message', cb)
  //   }
  //   workerList[0].on('message', cb)
  // })

  const res = await dispatch({
    instance: workerList[0],
    dispatchFun: 'send',
    receiveFun: 'message',
    msg: new Date().getTime()
  })
  ctx.body = {
    x: 1,
    res
  }
})
app.listen(2345)
