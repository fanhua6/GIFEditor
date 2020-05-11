const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports  = {
  publicPath: process.env.NODE_ENV === 'production' ? 'static' : '/',
  outputDir: 'static',
  productionSourceMap: false,
  filenameHashing: false,
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
      .set('_conf', resolve('config'))
  },
  devServer: {
    port: 80
  }
}