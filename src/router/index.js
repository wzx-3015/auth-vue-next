/*
 * @Description: 路由配置信息
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-04-19 10:05:00
 * @LastEditTime: 2021-09-08 16:29:43
 * @LastEditors: @Xin (834529118@qq.com)
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeLayout from '@/layout/HomeLayout.vue'

const NoFind = () => import(/* webpackChunkName: "404" */ '@/views/Exception/404.vue')
const NoPermission = () => import(/* webpackChunkName: "403" */ '@/views/Exception/403.vue')
const Login = () => import(/* webpackChunkName: "login" */ '@/views/Login/index.vue')
const LOGINAUTH = process.env.VUE_APP_LOGIN_AUTH

// 静态配置路由默认已加载
export const constRoutes = [
  {
    path: '/',
    redirect: '/home',
    name: 'redirect',
  },
  {
    path: '/login',
    component: Login,
    name: 'Login',
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
    component: HomeLayout,
    name: 'HomeLayout',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home/index.vue'),
      },
      {
        path: '/algorithm',
        name: 'Algorithm',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home/index.vue'),
      },
      {
        path: '/algorithm-config',
        name: 'AlgorithmConfig',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home/index.vue'),
      },
      {
        path: '/banner-config',
        name: 'BannerConfig',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home/index.vue'),
      },
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
