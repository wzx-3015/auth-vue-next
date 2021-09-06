/*
 * @Description: 系统入口文件
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-04-19 10:05:00
 * @LastEditTime: 2021-05-12 10:23:36
 * @LastEditors: @Xin (834529118@qq.com)
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elementUI from './plugins/elementUI'
import directives from './directive'
import './utils/permission'
import 'normalize.css/normalize.css'

const app = createApp(App)

// app.config.errorHandler = (err, vm, info) => {
//   if (info === 'render function') {
//     return
//   }

//   // 自定义组件异常告警
//   if (info === 'component event handler') {
//     if (vm) {
//       const options = vm.$parent && vm.$parent.$options ? vm.$parent.$options : {}

//       const name = options.__file || options.name
//       console.log('异常文件路径或者名称', name)
//       console.log('异常栈信息', err.stack)
//       console.log('异常信息', err.toString())
//     }
//   }

//   if (info === 'native event handler') {
//     if (vm) {
//       const options = vm.$options || {}
//       const name = options.__file || options.name
//       console.log('异常文件路径或者名称', name)
//       console.log('异常栈信息', err.stack)
//       console.log('异常信息', err.toString())
//     }
//   }

//   return true
// }

app.use(store).use(router).use(directives).use(elementUI).mount('#app')
