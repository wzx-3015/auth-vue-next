/*
 * @Description: 权限指令
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-04-30 10:36:56
 * @LastEditTime: 2021-09-11 13:59:49
 * @LastEditors: @Xin (834529118@qq.com)
 */
import { isArray } from 'lodash-es'

export default {
  // 指令是具有一组生命周期的钩子：
  // 在绑定元素的父组件挂载之前调用
  beforeMount() {},
  // 绑定元素的父组件挂载时调用
  mounted(el, binding) {
    const { value } = binding
    if (!isArray(value)) {
      throw new Error('binding.value is not Array')
    }
    const { resources = [] } = binding.instance.$route.meta
    const hasPermission = resources.some(v => value.includes(v.method))
    if (!hasPermission) {
      el.parentNode.removeChild(el)
    }
  },
  // 在包含组件的 VNode 更新之前调用
  beforeUpdate() {},
  // 在包含组件的 VNode 及其子组件的 VNode 更新之后调用
  updated() {},
  // 在绑定元素的父组件卸载之前调用
  beforeUnmount() {},
  // 卸载绑定元素的父组件时调用
  unmounted() {},
}
