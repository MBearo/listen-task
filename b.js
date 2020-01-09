const { receive } = require('./event-stream')
receive(process, (msg, msgWrapper, dispatch) => {
  console.log(msg);
  dispatch(`Message received ${msg}`)
})