/*
 * @Description: vue.config.js
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-04-19 11:04:04
 * @LastEditTime: 2022-11-15 10:06:49
 * @LastEditors: @Xin (834529118@qq.com)
 */
const api = 'http://192.168.11.144:8801'

const ZipPlugin = require('zip-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const path = require('path')

// 请求URL统一路径
const VUE_APP_REQUEST_API = process.env.VUE_APP_REQUEST_API
const VUE_APP_NAME = process.env.VUE_APP_NAME

module.exports = {
  devServer: {
    proxy: {
      [VUE_APP_REQUEST_API]: {
        target: api,
        onProxyRes: cookiePathRewriter,
        pathRewrite: {
          ['^' + VUE_APP_REQUEST_API]: VUE_APP_REQUEST_API,
        },
      },
      '/api': {
        target: api,
        onProxyRes: cookiePathRewriter,
        pathRewrite: {
          '^api': '/api',
        },
      },
    },
  },
  productionSourceMap: !isProduction,
  configureWebpack: config => {
    if (isProduction) {
      config.plugins.push(
        new ZipPlugin({
          path: path.join(__dirname, './dist_zip'), // zip文件输出路径 dist_zip
          filename: `${VUE_APP_NAME}_${Date.now()}.zip`,
        })
      )

      // 代码拆分
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          elementPlus: {
            name: 'chunk-elementPlusUI',
            test: /[\\/]node_modules[\\/]element-plus[\\/]/,
            priority: 20,
          },
          echarts: {
            name: 'chunk-echarts',
            test: /[\\/]node_modules[\\/]echarts[\\/]/,
            priority: 20,
          },
        },
      }
    }
  },
  chainWebpack: config => {
    // const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    // types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
  },
}

// 增加全局lee变量的引用
function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/global.module.less')],
    })
}

/**
 * Cookie Path Rewrite Helper
 * how to use: onProxyRes: cookiePathRewriter (in proxyTable items.)
 */
function cookiePathRewriter(proxyRes) {
  // judge if "set-cookie" is included in the response header
  let cookies = proxyRes.headers['set-cookie']
  if (!cookies || cookies.length === 0) {
    delete proxyRes.headers['set-cookie']
    return
  }

  // rewrite cookie path
  let cookieItems = cookies[0].split(';')
  let newCookie = ''
  for (let i = 0, len = cookieItems.length; i < len; i++) {
    if (newCookie.length > 0) {
      newCookie += ';'
    }
    // judge if start with "path=" or "Path="
    if (cookieItems[i].indexOf('path=') >= 0) {
      newCookie += 'path=/'
    } else if (cookieItems[i].indexOf('Path=') >= 0) {
      newCookie += 'Path=/'
    } else {
      newCookie += cookieItems[i]
    }
  }
  // rewrite the cookie
  proxyRes.headers['set-cookie'] = newCookie
}
