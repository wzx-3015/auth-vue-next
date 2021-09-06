/*
 * @Description: 权限管模块(拦截路由进行路由的匹配以及添加)
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-05-06 09:42:37
 * @LastEditTime: 2021-08-16 11:10:06
 * @LastEditors: @Xin (834529118@qq.com)
 */

import router, { constRoutes } from '@/router/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
import { ElLoading } from 'element-plus'
import { openLoginPage, localStorageGetLoginToken, handleRequestTokenElMessageBoxConfirm } from './index'
import { useRoute } from 'vue-router'
import { isArray } from './validate'
import { flatAsyncRoute } from '@/utils/index'

const LOGINAUTH = process.env.VUE_APP_LOGIN_AUTH

// 开放路由配置项
const notLoginExclude = ['404', '403', 'redirect']
const notLoginRoutes = flatAsyncRoute(constRoutes.filter(v => !notLoginExclude.includes(v.name))).map(v => v.name)

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
}

// 路由拦截处理
router.beforeEach((to, from, next) => {
  NProgress.start()

  const loadingInstance = ElLoading.service({
    text: '资源加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
    fullscreen: true,
  })

  // 如果设置为开发模式则不进行路由的动态添加以及登录逻辑的校验 || 开放性路由
  if (LOGINAUTH === 'false' || notLoginRoutes.includes(to.name)) {
    NProgress.done()
    loadingInstance.close()
    next()
    return
  }

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
              loadingInstance.close()
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
        openLoginPage()
      } else {
        store
          .dispatch('user/GetUserInfo')
          .then(() => {
            addRoutes(router, store.state.user.addRoutes)

            NProgress.done()

            next({ path: to.path, query: to.query, params: to.params, replace: true })
          })
          .catch(err => {
            handleRequestTokenElMessageBoxConfirm(err.message, '获取信息异常,请重新登录', window.location.href)
          })
          .finally(() => loadingInstance.close())
      }
    }
  } else {
    NProgress.done()
    loadingInstance.close()
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
