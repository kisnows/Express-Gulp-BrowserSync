const path = require('path')
const url = require('url')
const chalk = require('chalk')
const request = require('request')
const express = require('express')

const config = require('./config')
const app = express()
const router = express.Router()

var viewPath = path.join(__dirname, 'views');``
// view engine setup
app.set('views', path.join(viewPath));
app.set('view engine', 'pug');

// 静态资源
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', router);

app.use(function (err, req, res, next) {
  err.status = err.status || 500
  res.status(err.status)
  res.send(err.message)
})

//mock
if (process.env.NODE_ENV === 'development') {
  console.log(chalk.yellow('dev server'))
  require('./data')(router)
} else if (process.env.NODE_ENV === 'api') {
  router.use('/', function (req, res, next) {
    console.log(chalk.yellow(req.method + ' ' + req.url))
    console.log('http://' + process.env.REMOTE_API + req.url)
    if (req.method.toUpperCase() === 'GET') {
      request({
        qs: req.body,
        method: req.method,
        url: 'http://' + process.env.REMOTE_API + req.url,
        headers: req.headers
      }).pipe(res);
    } else if (req.method.toUpperCase() === 'POST') {
      request({
        form: req.body,
        method: req.method,
        url: 'http://' + process.env.REMOTE_API + req.url,
        headers: req.headers
      }).pipe(res);
    }
  });
}
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// 静态路由
// router.use('/', function (req, res) {
//   var filePath = req.path
//   if (/\.jade$/.test(filePath)) {
//     var fileName = filePath.replace(/(\/|\.jade)/g, '')
//     console.log(fileName)
//     res.render(fileName)
//   }
// })

const port = config.port || 3000

app.listen(port)
