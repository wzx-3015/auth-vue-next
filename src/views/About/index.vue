<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-04-19 10:05:00
 * @LastEditTime: 2021-05-12 10:04:10
 * @LastEditors: @Xin (834529118@qq.com)
-->
<template>
  <div class="about">
    {{ aa.a }}
    <div v-for="item in aa.todos" :key="item.id">
      {{ item.id }}
    </div>
    <el-button type="primary" @click="handleStopWatch">主要按钮</el-button>

    <button @click="handleStopWatch">aaaaaa</button>
    <div @click="handleStopWatch">这是文字</div>
    <input type="text" @input="handleStopWatch" />
    <el-button @click="handleLogOut" type="primary">登出</el-button>
    <el-button @click="getData" type="primary">获取数据</el-button>
  </div>
</template>
<script>
import useStoreAuxiliary from '@/plugins/useStoreAuxiliary'
import { get } from '@/utils/request.js'

const demo = ['a', 'b']

demo.forEach(v => {
  console.log(import(`./components/${v}.vue`))
})

export default {
  setup() {
    const { getStoreState, dispatchActions, getGetters, commitMutations } = useStoreAuxiliary()
    const a = {}
    const handleStopWatch = () => {
      dispatchActions('app/increment', '12').then(() => {
        console.log('操作完成')
      })

      console.log(a.c.indexOf('1'))

      getGetters('app/doneTodos').map(v => {
        console.log('map循环', v.text)
      })

      getGetters('app/getTodoById')(2)

      commitMutations('app/pushTodos', { id: Date.now(), text: 'three', done: false })

      console.log(getGetters('getTodoById'))
    }

    const handleLogOut = () => {
      dispatchActions('user/Logout')
    }

    const getData = () => {
      get('/index', { content: '12' })
    }

    return {
      aa: getStoreState('app'),
      handleStopWatch,
      handleLogOut,
      getData,
    }
  },
}
</script>
<style scoped lang="less"></style>
