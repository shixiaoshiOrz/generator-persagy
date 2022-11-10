const { name, title, version } = require('./package.json') 
const proxy = 'https://doimp.persagy.com/' 
const webpackVersionZip = require('webpack-version-zip')
<% if ( cli === "cli5" ) { %>const { defineConfig } = require("@vue/cli-service")<% }%>
module.exports = <%= cli === "cli5" ? "defineConfig(" : "" %>{
  publicPath: `/${name}`, 
  outputDir: name,       
  assetsDir: 'static',    
  lintOnSave: false,      
  productionSourceMap: false, 
  parallel: require('os').cpus().length > 1, 
  css:<% if ( cli === "cli4" ) { %>{
    loaderOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true
      }
    }
  },<% }else{ %>{},<% }%>
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = title 
      return args
    })
    // 使用svg组件
    config.performance.set('hints', false)
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.use('babel-loader').loader('babel-loader').end().use('vue-svg-loader').loader('vue-svg-loader')
    // 打包时创建version文件
    if (process.env.NODE_ENV === 'production') {
      config.plugin('version').use(webpackVersionZip, [name, false])
    }
  },
  // 配置跨域
  devServer: {<% if ( qiankun ) { %>
    headers: {
      'Access-Control-Allow-Origin': '*',
    },<% }%>
    proxy: {
      '/api': {
        target: proxy,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },<% if ( qiankun ) { %>
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      <%- cli === "cli4" ? "jsonpFunction: `webpackJsonp_${name}`" : "chunkLoading: 'jsonp'"%>
    }
  }<% }%>
}<%= cli === "cli5" ? ")" : "" %>
