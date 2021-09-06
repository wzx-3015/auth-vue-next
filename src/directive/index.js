/*
 * @Description: 自定义指令入口文件
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-04-30 10:24:42
 * @LastEditTime: 2021-05-12 10:22:47
 * @LastEditors: @Xin (834529118@qq.com)
 */
const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // 获取文件名称 ./app.js => app
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')

  // 获取文件内容
  const value = modulesFiles(modulePath)

  modules[moduleName] = value.default || {}

  return modules
}, {})

export default app => {
  const directiveData = Object.entries(modules)
  if (directiveData.length) {
    directiveData.forEach(([name, value]) => {
      app.directive(name, value)
    })
  }
}
