<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-05-06 16:51:38
 * @LastEditTime: 2022-11-14 17:58:24
 * @LastEditors: @Xin (834529118@qq.com)
-->
<template>
  <div class="home">这是首页</div>
  <el-button @click="handleCilck" v-hasPermi="['PUT', 'GET']" type="primary">主要按钮</el-button>
  <el-button @click="handleLogOut" type="primary">登出</el-button>

  <div id="demo"></div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'HomePage',
  setup() {
    const router = useRouter()

    console.log(useRoute().params)

    const handleCilck = () => {
      router.push({ name: 'About' })
    }

    const handleLogOut = () => {}

    return {
      handleCilck,
      handleLogOut,
    }
  },
}
</script>

<style lang="less" scoped></style>
