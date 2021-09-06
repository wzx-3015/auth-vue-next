/*
 * @Description: 路由配置信息
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-04-19 10:05:00
 * @LastEditTime: 2021-07-30 15:58:47
 * @LastEditors: @Xin (834529118@qq.com)
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeLayout from '@/layout/HomeLayout.vue'

const NoFind = () => import(/* webpackChunkName: "404" */ '@/views/Exception/404.vue')
const NoPermission = () => import(/* webpackChunkName: "403" */ '@/views/Exception/403.vue')
const LOGINAUTH = process.env.VUE_APP_LOGIN_AUTH

// 静态配置路由默认已加载
export const constRoutes = [
  {
    path: '/',
    redirect: '/home',
    name: 'redirect',
  },
  {
    path: '/403',
    component: NoPermission,
    name: '403',
  },
  {
    path: '/:pathMatch(.*)*',
    component: NoFind,
    name: '404',
  },
]

// 异步加载路由 (根据权限管理系统返回的modules模块进行匹配添加)
export const asyncRoutes = [
  {
    path: '/home',
    component: HomeLayout,
    name: 'HomeLayout',
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home/index.vue'),
      },
      // {
      //   path: '/1',
      //   name: 'Home1',
      //   component: () => import(/* webpackChunkName: "home" */ '@/views/Home/index.vue'),
      // },
    ],
  },
  {
    path: '/about',
    component: HomeLayout,
    name: 'AboutLayout',
    children: [
      {
        path: '',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/About/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: LOGINAUTH === 'false' ? [].concat(constRoutes, asyncRoutes) : constRoutes,
})

export default router
