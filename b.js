const { receive } = require('./event-stream')
// process.on('message', msg => {
//   console.log(msg);
//   process.send(`Message received ${msg}`)
// })
receive({
  instance: process,
  dispatchFun: 'send',
  receiveFun: 'message'
}, (msg, msgWrapper, dispatch) => {
  console.log(msg);
  dispatch(`Message received ${msg}`)
})