/*
 * @Description: 路由配置信息
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-04-19 10:05:00
 * @LastEditTime: 2021-11-04 13:53:32
 * @LastEditors: @Xin (834529118@qq.com)
 */
import { createRouter, createWebHistory } from 'vue-router'

import constRoutes from './constRoutes'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constRoutes,
})

export default router
