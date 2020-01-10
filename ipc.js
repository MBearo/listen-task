let id = 0

exports.receive = function (config, cb) {
  let { instance, dispatchFun = 'send', receiveFun = 'message' } = config
  instance = instance || config
  instance.on(receiveFun, msg => {
    cb(msg.__msg, msg, arg => {
      instance[dispatchFun]({
        __id: msg.__id,
        __msg: arg
      })
    })
  })
}
exports.dispatch = function ({ instance, dispatchFun = 'send', receiveFun = 'message', msg }) {
  if (id > 10000)id = 0
  id++
  instance[dispatchFun]({
    __id: id,
    __msg: msg
  })
  return new Promise(resolve => {
    let cb = ({ __id, __msg }) => {
      if (__id === id) {
        resolve(__msg);
        instance.off(receiveFun, cb)
      }
    }
    instance.on(receiveFun, cb)
  })
}
