<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-05-06 17:47:26
 * @LastEditTime: 2022-11-14 17:57:36
 * @LastEditors: @Xin (834529118@qq.com)
-->
<template>
  <div class="home-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" @select="handleMenuSelect">
          <el-menu-item :index="String(item.meta.id)" v-for="item in menus" :key="item.meta.id">
            <i class="el-icon-menu"></i>
            <template #title>{{ item.meta.title }}</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        ==============
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'HomeLayout',
  setup() {
    const route = useRoute()

    console.log('route', route)

    const defaultActive = computed(() => String(route.meta.id))

    const handleMenuSelect = index => {
      console.log(index)
    }

    return {
      menus: [],
      handleMenuSelect,
      defaultActive,
    }
  },
}
</script>

<style></style>
