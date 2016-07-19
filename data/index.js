var forceRequire = require('require-reload')

module.exports = function (router) {
  var data = forceRequire('./data')
  //每隔1秒重新解析data，刷新data，新增的路由不会生效
  setInterval(function () {
    data = forceRequire('./data')
  }, 1000)

  for (var i in data) {
    (function (v) {
      router.get(v, function (req, res) {
        res.json(
          data[v]
        )
      })
      router.post(v, function (req, res) {
        res.json(
          data[v]
        )
      })
    })(i)
  }
}
