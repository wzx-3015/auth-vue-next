/*
 * @Description: 权限管模块(拦截路由进行路由的匹配以及添加)
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-05-06 09:42:37
 * @LastEditTime: 2021-09-11 09:32:41
 * @LastEditors: @Xin (834529118@qq.com)
 */

import router, { asyncRoutes } from '@/router/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
import { useRoute } from 'vue-router'
import { isArray } from 'lodash-es'
import { flatAsyncRoute, localStorageGetLoginToken, handleRequestTokenElMessageBoxConfirm } from '@/utils/index'

const LOGINAUTH = process.env.VUE_APP_LOGIN_AUTH

// 权限路由配置信息
const asynLogincRoutesPath = Array.from(
  new Set(
    flatAsyncRoute(asyncRoutes)
      .map(v => v.path)
      .filter(v => v)
  )
)
/**
 * @description:  添加路由
 * @param {Router} Router 路由实例
 * @param {Array} routes 路由列表
 * @return {null}
 */
const addRoutes = (Router, routes) => {
  routes.forEach(v => {
    Router.addRoute(v)
  })

  return Promise.resolve()
}

// 路由拦截处理
router.beforeEach((to, from, next) => {
  NProgress.start()

  // 开发模式开放所有路由
  if (LOGINAUTH === 'false') {
    NProgress.done()
    next()
    return true
  }

  // 访问权限模块
  if (asynLogincRoutesPath.includes(to.path)) {
    // login 不存在代表未登录或者刷新
    if (!store.state.user.login) {
      // ak参数存在  处理登录逻辑
      if (to.query.ak) {
        const { ak, ...rest } = to.query
        store
          .dispatch('user/Login', { ak })
          .then(() => {
            // 获取用户信息
            store
              .dispatch('user/GetUserInfo')
              .then(() => {
                NProgress.done()
                addRoutes(router, store.state.user.addRoutes)

                // 解决新增route不生效
                next({ path: to.path, query: { ...rest }, params: to.params, replace: true })
              })
              .catch(err => {
                handleRequestTokenElMessageBoxConfirm(err.message, '登录异常', window.location.href.replace(/\?ak=(\S*)/, ''))
              })
          })
          .catch(err => {
            handleRequestTokenElMessageBoxConfirm(err.message, '登录异常', window.location.href.replace(/\?ak=(\S*)/, ''))
          })
      } else {
        // TOKEN 不存在代表为第一次登录
        if (!localStorageGetLoginToken()) {
          next({ name: '403' })
        } else {
          store
            .dispatch('user/GetUserInfo')
            .then(() => {
              addRoutes(router, store.state.user.addRoutes).then(() => {
                next({ path: to.path, query: to.query, params: to.params, replace: true })
              })
            })
            .catch(err => {
              handleRequestTokenElMessageBoxConfirm(err.message, '获取信息异常,请重新登录', window.location.href)
            })
            .finally(() => NProgress.done())
        }
      }
    } else {
      NProgress.done()
      if (to.params.pathMatch && !router.hasRoute(to.params.pathMatch[0])) {
        next({ name: '403', query: { voidStatus: 1 }, replace: true })
        return true
      }
      next()
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

/**
 * @description:   权限校验
 * @param {Array} permission
 * @return {Boolean} true|false
 */
export const hasPermission = permission => {
  if (!isArray(permission)) {
    throw new Error('permission is not Array')
  }
  const route = useRoute()
  const { resources = [] } = route.meta

  return resources.some(v => permission.includes(v.methods))
}
