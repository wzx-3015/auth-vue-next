/*
 * @Description: 异步加载路由 (根据权限管理系统返回的modules模块进行匹配添加)
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-11-04 13:51:30
 * @LastEditTime: 2022-11-14 17:57:00
 * @LastEditors: @Xin (834529118@qq.com)
 */
import HomeLayout from '@/layout/HomeLayout.vue'

const asyncRoutes = [
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
]

export default asyncRoutes
