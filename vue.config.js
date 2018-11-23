const path = require('path')

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('views', path.resolve(__dirname, 'src/views'))
      .set('components', path.resolve(__dirname, 'src/components'))
      .set('assets', path.resolve(__dirname, 'src/assets'))
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  devServer: {
    // host: '192.168.1.118',
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {'^/api': ''}
      }
    }
  },
  // lintOnSave: undefined
}