<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-04-19 10:05:00
 * @LastEditTime: 2021-05-11 11:13:22
 * @LastEditors: @Xin (834529118@qq.com)
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <el-button type="primary" @click="handleStopWatch">主要按钮</el-button>
    <!-- {{ demo }} -->
    <!-- {{ demo01.aa }} -->
    {{ a }}
    {{ demo.c }}
    {{ user }}
    <br />
    cbd
    {{ cbd }}
    <HelloWorld msg="Welcome to Your Vue.js App" />

    <div id="demo"></div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import { computed, getCurrentInstance, reactive, ref } from 'vue'
import { get, post } from '@/utils/request.js'
import { createNamespacedHelpers, mapState, useStore } from 'vuex'
// mapState: mapAppState,
const { mapActions } = createNamespacedHelpers('app')

export default {
  components: {
    HelloWorld,
  },
  computed: {
    // ...mapAppState(['a']),
  },
  methods: {
    ...mapActions(['increment']),
  },
  setup(props, context) {
    console.log(props, context)
    const Instance = getCurrentInstance()
    const store = useStore()

    const demo = reactive({ aa: 1 })

    const app = mapState('app', {
      a: state => state.a,
      countAlias: 'a',
    })

    console.log(app)

    const handleStopWatch = () => {
      // Instance.proxy.increment() 实现更新store值方法1

      console.log(Instance, store)

      store.dispatch('app/increment') // 实现更新store值方法2
    }

    const cbd = ref(store.state.app)
    computed(() => store.state.app.a)
    // console.log()

    // console.log(mapState(['a']))

    // const aaa = mapState(['a'])

    // get('/index', { content: '12=' })
    get('/index', { content: '12' })

    // post('/index', { content: '123' })
    post('/index', { content: '1234' })

    return {
      a: store.state.app.a,
      cbd,
      demo: store.state.app.demo,
      user: store.state.user,
      demo01: demo,
      handleStopWatch,
    }
  },
}
</script>
