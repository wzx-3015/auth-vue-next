/*
 * @Description: Store 入口文件
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-04-19 10:05:00
 * @LastEditTime: 2021-11-04 13:46:42
 * @LastEditors: @Xin (834529118@qq.com)
 */
import { createStore } from 'vuex'

const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // 获取文件名称 ./app.js => app
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')

  // 获取文件内容
  const value = modulesFiles(modulePath)

  modules[moduleName] = value.default || {}

  return modules
}, {})

export default createStore({
  getters: {},
  modules,
})
