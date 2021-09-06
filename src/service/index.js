/*
 * @Description: 登录、注销、退出等全局请求
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-05-06 11:04:15
 * @LastEditTime: 2021-05-12 10:21:43
 * @LastEditors: @Xin (834529118@qq.com)
 */
import { get, post } from '@/utils/request.js'

/**
 * @description:   登录接口
 * @param {Object} params
 * @param {String} params.ak
 * @return {Promise}
 */
export const login = params => get('/default/login', params)

/**
 * @description:  获取用户信息
 * @param {null}
 * @return {Promise}
 */
export const getUserInfo = () => get('/default/user-info')

/**
 * @description: 登出(退出)
 * @param {null}
 * @return {Promise}
 */
export const logout = () => post('/default/logout')
