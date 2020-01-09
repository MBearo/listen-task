const { receive } = require('./ipc')
receive(process, (msg, msgWrapper, dispatch) => {
  console.log(msg);
  dispatch(`Message received ${msg}`)
})