/* eslint-disable no-console */
const express = require('express')
const compress = require('compression')

require('./NeteaseCloudMusicApi/app')

const proxy = require('http-proxy-middleware')

const PORT = 5000
const HOST = '0.0.0.0'

const app = express()
app.use(compress())

app.use(function(req, res, next) {
  console.log(req.baseUrl, req.path);
  next();
})

app.use('/api', proxy({
  target: 'http://localhost:3000',
  changeOrigin: true,
  pathRewrite: {'^/api': ''}
}))

app.use(express.static('./dist'));

app.listen(PORT, HOST, () => {
  console.log('Music App is running at: http://127.0.0.1' + ':' + PORT);
});