/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-05-10 10:42:46
 * @LastEditTime: 2021-11-04 13:45:37
 * @LastEditors: @Xin (834529118@qq.com)
 */
import { ElMessageBox } from 'element-plus'

// 登录页面路径
const loginPath = process.env.VUE_APP_LOGINPATH
// 系统名称
const SYSTEM_NAME = process.env.VUE_APP_SYSTEM_NAME

const LOGINGSTATUS = 'loginToken'

/**
 * @description:   设置TOKEN
 * @param {String} TOKEN
 * @return {*}
 */
export const localStorageSetLoginToken = TOKEN => {
  TOKEN && localStorage.setItem(LOGINGSTATUS, TOKEN)
}

/**
 * @description:  移除TOKEN
 * @param {*}
 * @return {*}
 */
export const localStorageReomveLoginToken = () => {
  localStorage.removeItem(LOGINGSTATUS)
}

/**
 * @description: 获取TOKEN
 * @param {null}
 * @return {String || null} TOKEN
 */
export const localStorageGetLoginToken = () => {
  return localStorage.getItem(LOGINGSTATUS)
}

/**
 * @description:  跳转登录页(可指定携带参数跳转地址,默认获取携带当前地址跳转)
 * @param {String}  url 跳转地址
 * @return {*}
 */
export const openLoginPage = url => {
  const { href } = window.location
  if (url) {
    window.location.replace(`${loginPath}?callbackUrl=${encodeURIComponent(url)}&name=${escape(SYSTEM_NAME)}&logout=true`)
    return
  }

  window.location.replace(`${loginPath}?callbackUrl=${encodeURIComponent(href)}&name=${escape(SYSTEM_NAME)}&logout=true`)
}

/**
 * @description: Token失效  异常弹窗告警
 * @param {*}
 * @return {*}
 */
export const handleRequestTokenElMessageBoxConfirm = (message, title, url = '') => {
  ElMessageBox.confirm(message, title, {
    confirmButtonText: '确定',
    showClose: false,
    type: 'warning',
    showCancelButton: false,
    callback: () => {
      localStorageReomveLoginToken()
      openLoginPage(url)
    },
  })
}
