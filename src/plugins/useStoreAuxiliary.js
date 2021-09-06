/*
 * @Description: 辅助操作vuex(请保证实例化方法在setup函数中)
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-04-27 17:52:01
 * @LastEditTime: 2021-04-28 13:14:38
 * @LastEditors: @Xin (834529118@qq.com)
 */
import { useStore } from 'vuex'

/**
 * @description:  自定义hook 辅助操作vuex
 * @param {Function} getStoreState 辅助获取store中的state值
 * @param {Function} dispatchActions 辅助操作Actions
 * @return {*}
 */
const useStoreAuxiliary = () => {
  const store = useStore()
  /**
   * @description:  获取store中State存储值
   * @param {String || null} spacedName  store命明空间
   * @return {Obejct} store.state[spacedName] || store.state
   */
  const getStoreState = spacedName => {
    return spacedName ? store.state[spacedName] : store.state
  }

  /**
   * @description:   触发store  actions方法
   * @param {String} key 方法名称
   * @param {any} rest   其他参数
   * @return {Promise} 操作完成的回调
   */
  const dispatchActions = (key, ...rest) => {
    // app modules => key = app/Actions
    // store => key = Actions
    return store.dispatch(key, ...rest)
  }

  /**
   * @description:   触发store mutations方法
   * @param {String} key    方法名称
   * @param {any} rest   其他参数
   * @return {*}
   */
  const commitMutations = (key, ...rest) => {
    // app modules => key = app/Mutations
    // store => key = Mutations
    return store.commit(key, ...rest)
  }

  /**
   * @description:   获取vuex中的getters
   * @param {String} key  名称
   * @return {any}
   */
  const getGetters = key => {
    // app modules => key = app/Getters
    // store => key = Getters
    return store.getters[key]
  }

  return {
    getStoreState,
    dispatchActions,
    commitMutations,
    getGetters,
  }
}

export default useStoreAuxiliary
