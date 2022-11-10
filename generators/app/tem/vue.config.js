const { name, title, version } = require('./package.json') // 项目信息
const proxy = 'http://192.168.100.236' // 需要代理请求的nginx地址
const webpackVersionZip = require('webpack-version-zip')
module.exports = {
  publicPath: `/${name}`, // 相对路径
  outputDir: name, // 打包名称
  assetsDir: 'static', // 静态目录
  lintOnSave: false, // 关闭lint代码
  productionSourceMap: false, // 生产环境是否开启sourceMap
  parallel: require('os').cpus().length > 1, // 启用多核打包
  css: {
    loaderOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: (config) => {
    config.plugin('html').tap(args => {
      args[0].title = title // 修改标题
      return args
    })
    // 使用svg组件
    config.performance.set('hints', false)
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
    // 打包时创建version文件
    if (process.env.NODE_ENV === 'production') {
      config.plugin('version')
        .use(webpackVersionZip, [name, false])
    }
  },
  // 配置跨域
  devServer: {
    proxy: {
      '/api': {
        target: proxy,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}