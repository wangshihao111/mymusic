const express = require('express')

const proxy = require('http-proxy-middleware')

const PORT = 5000
const HOST = '0.0.0.0'

const app = express()

app.use('/api', proxy({
  target: 'http://localhost:3000',
  changeOrigin: true,
  pathRewrite: {'^/api': ''}
}))

app.use(express.static('./dist'));

app.listen(PORT, HOST, () => {
  console.log('app is runding at: ' + HOST + ':' + PORT);
});