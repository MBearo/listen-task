let id = 0

exports.receive = function ({ instance, dispatchFun, receiveFun }, cb) {
  const warpper = function (...arg) {
    instance[dispatchFun](...arg)
  }
  instance.on(receiveFun, msg => {
    cb(msg.__msg, msg, warpper)
  })
}
exports.dispatch = function ({ instance, dispatchFun, receiveFun, msg }) {
  id++
  instance[dispatchFun]({
    __id: id,
    __msg: msg
  })
  return new Promise(resolve => {
    let cb = content => {
      resolve(content);
      instance.off(receiveFun, cb)
    }
    instance.on(receiveFun, cb)
  })
}
