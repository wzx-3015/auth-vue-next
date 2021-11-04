/*
 * @Description: 系统入口文件
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-04-19 10:05:00
 * @LastEditTime: 2021-11-04 13:53:15
 * @LastEditors: @Xin (834529118@qq.com)
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import asyncRoutes from './router/asyncRoutes'
import store from './store'
import directives from './directive'
import 'normalize.css/normalize.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { dfsjUnifyAuth } from 'dfsj-auth'

const app = createApp(App)

app
  .use(store)
  .use(router)
  .use(directives)
  .use(ElementPlus)
  .use(dfsjUnifyAuth, {
    systemName: process.env.VUE_APP_SYSTEM_NAME,
    loginAuth: process.env.VUE_APP_LOGIN_AUTH,
    asyncRoutes,
    loginPath: process.env.VUE_APP_LOGINPATH,
  })
  .mount('#app')
