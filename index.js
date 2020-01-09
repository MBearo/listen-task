const Koa = require('Koa')
const WebSocket = require('ws')

const app = new Koa()
const wss = new WebSocket.Server({ port: 4567 });
let wsArr = []

app.use(async ctx => {

  wsArr[0].send('2sdf2fd')
  let res = await new Promise(resolve => {
    wsArr[0].once('message', msg => {
      resolve(msg)
    })
  })
  ctx.body = {
    x: 1,
    res
  }
})
app.listen(2345)

wss.on('connection', ws => {
  wsArr.push(ws)
})