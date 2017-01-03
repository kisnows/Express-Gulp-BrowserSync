# Express+BrowserSync+nodemon

## 使用(Use)
```bash
npm install
```

## 开发(dev)
```bash
npm run dev
```
Express 会被 BrowserSync 代理到 5000 端口，同时提供本地 mock 功能， mock 数据存放在 data/data.js 里面，简单粗暴，就是一个 JSON 对象。当然也可以在 server 的 data/index.js 里面自定义更加详细的数据返回。
## 联调(dev api)
```bash
npm run api
```
在上一个命令的基础上，把 mock 数据由本地换为实际服务器地址，可以在 config.js 下面配置
```javascript
module.exports = {
  'port': 3000,
  'remoteApi': '10.240.96.129:3008'   //服务器地址
}
```
## 构建(dist)
```bash
npm run dist
```
打包压缩后的文件会存放在 public 文件夹下。

Browser to localhost:5000 ,go dev!
